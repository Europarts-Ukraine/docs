# Runtime Data Flows

This page traces the workflows that cross multiple applications. Start with the relevant run record, then follow its snapshot, work items, issues, and outputs.

## 1. Supplier import to catalog and assets

```mermaid
sequenceDiagram
  actor Operator
  participant UI as Frontend
  participant API as Imports API
  participant C as Connector
  participant DB as PostgreSQL
  participant I as Import worker
  participant M as DAM media worker

  Operator->>UI: Start profile (dry-run or apply)
  UI->>API: POST run action
  API->>DB: Lock profile semantics and create ImportRun snapshot
  API-->>UI: Return run id/status
  API->>I: Dispatch run id
  I->>C: Stream source rows
  C-->>I: Raw records
  I->>DB: COPY into reusable loading table
  I->>DB: Set-based validation and reference resolution
  alt blocking issue or dry-run
    I->>DB: Persist results, issues and artifacts only
  else valid apply
    I->>DB: Atomic target upserts + missing strategy
    I->>DB: Atomic supplier raw-snapshot swap
    I->>DB: Stage media ingestion scopes/items
    I->>M: Dispatch MediaIngestionRun
    M->>DB: Claim items and link stored assets to products
  end
```

### Important contracts

- The connection owns access technology and secrets; the supplier feed owns stable source dataset identity; the import profile owns field-level transformation.
- Identifiers must resolve to real target uniqueness constraints so set-based upserts remain deterministic.
- Supplier mode preserves the previous raw snapshot until the new run completes successfully.
- Dry-run executes extraction, preprocessing, loading, dependency planning, and validation but does not modify business rows or swap the snapshot.
- Media ingestion is a post-import stage. A successful catalog transaction is not held open while remote files download.

### Data produced

The import may write system catalog tables, custom-entity rows, and supported M2M junctions. Operational evidence remains on `ImportRun`, target results, issues, and artifacts. Product media mappings may produce a linked `MediaIngestionRun` whose items lead to `Asset` and `ProductAsset` records.

## 2. Cross-source identity resolution

```mermaid
flowchart TB
  DEF["Published MappingDefinition"] --> SNAP["MappingRun config snapshot"]
  OV["Manual overrides"] --> SNAP
  SNAP --> ELIG["Eligibility and normalization"]
  ELIG --> CAND["Candidate generation"]
  CAND --> RULES["Compatibility, rejection and ambiguity rules"]
  RULES --> CONS["Group constraints"]
  CONS --> GROUPS["MappingGroup + members"]
  GROUPS --> CONFLICTS["Conflicts and diagnostics"]
  GROUPS --> CHANNEL["Channel representative selection"]
  GROUPS --> CONTENT["Mapped-sibling content fallback"]
  GROUPS --> ANALYTICS["Cross-source price comparison"]
  GROUPS --> FEED["Export offer grouping"]
```

The definition is reusable configuration; the run is the reproducible execution. The result groups existing source products. Downstream apps query the active/published result associated with the mapping definition they are configured to use.

Manual positive links force allowed equivalence, negative links prevent it, and exclusions remove records from automatic participation. The mapping app owns precedence and consistency of those decisions.

## 3. Classification target publication

Identity grouping and classification normalization are distinct flows.

```mermaid
sequenceDiagram
  participant Rules as Mapping target rules
  participant Map as Mapping target service
  participant DB as PostgreSQL
  participant Channel as Channel resolver

  Rules->>Map: Run target projection
  Map->>DB: Persist MappingTargetRun and assignments
  Map->>DB: Publish product brand/category projections
  Channel->>DB: Resolve effective classification
  DB-->>Channel: Manual assignment, else mapped projection, else source value
```

This precedence lets operators override individual values without discarding automatic projections or source truth.

## 4. Pricing preview and apply

```mermaid
sequenceDiagram
  actor Operator
  participant UI as Pricing UI
  participant API as Pricing API
  participant Calc as DuckDB calculation service
  participant DB as PostgreSQL

  Operator->>UI: Preview pricing rule
  UI->>API: Start preview
  API->>DB: Create PriceCalculationRun snapshot
  API->>Calc: Load selected products and source values
  Calc->>Calc: Conditions, formula, currency, VAT, rounding, constraints
  Calc->>DB: Persist preview result and errors
  UI->>API: Inspect run
  Operator->>UI: Apply accepted preview
  UI->>API: Apply run
  API->>DB: Atomically replace rule-generated target prices
```

Preview and apply are deliberately separate. A run records which rule configuration and input context produced the proposed values. Apply operates from that persisted result, not from a silently changed rule.

`ProductPrice` remains the common read model for channel exports and analytics regardless of whether a value was manual, imported, or calculated.

## 5. Channel assortment synchronization

```mermaid
flowchart LR
  P["Active products"] --> SCOPE["Channel scope rules"]
  STOCK["Product stock"] --> SCOPE
  GROUPS["Mapping groups"] --> PICK["Representative selection"]
  SCOPE --> PICK
  PRIORITY["Supplier priority"] --> PICK
  PICK --> LOCALES["One row per active channel locale"]
  LOCALES --> ACTIVE["Create or unarchive in-scope enrichment"]
  LOCALES --> ARCHIVE["Archive rows that left scope"]
  ACTIVE --> CONTENT["Preserve existing authored content"]
```

The channel never duplicates an entire catalog. Synchronization materializes only the per-product, per-channel, per-locale content rows required for publication. A mapping group contributes at most one representative product according to channel priority and current eligibility.

## 6. Channel content copy and AI enrichment

```mermaid
sequenceDiagram
  actor Operator
  participant UI as Enrichment UI
  participant API as Enrichment API
  participant DB as PostgreSQL
  participant W as Enrichment worker
  participant AI as AI provider

  Operator->>UI: Choose channel, locale, fields and apply mode
  UI->>API: Create/run enrichment
  API->>DB: Snapshot configuration and selected products
  API->>W: Dispatch EnrichmentRun
  loop each claimed run item
    W->>DB: Build input from product, translations and mapped siblings
    alt copy_original
      W->>W: Pick first non-empty field by supplier priority
    else ai_generate
      W->>AI: Prompt with allowed input context
      AI-->>W: Generated target fields and usage
    end
    alt immediate
      W->>DB: Update ProductChannelEnrichment
    else review
      W->>DB: Store result and previous values on run item
    end
  end
  Operator->>UI: Review and approve selected items
  UI->>API: Apply approved results
  API->>DB: Update channel content and apply progress
```

The target is always channel-localized content. Base catalog data and translations provide input but are not overwritten by enrichment. Run items preserve inputs, outputs, previous values, errors, and provider usage so review and audit have the full context.

## 7. Product feed export

```mermaid
flowchart TB
  PROFILE["ExportProfile + field contract"] --> PREFLIGHT["Preflight and diagnostics"]
  GRAPH["Entity graph and custom metadata"] --> PREFLIGHT
  PREFLIGHT --> RUN["ExportRun snapshot"]
  CH["Channel assortment and localized content"] --> ASSEMBLE["Product feed assembler"]
  PRICE["Selected ProductPrice rows"] --> ASSEMBLE
  STOCK["Stock"] --> ASSEMBLE
  ATTR["Attributes and custom fields"] --> ASSEMBLE
  DAM["Asset URLs"] --> ASSEMBLE
  GROUPS["Mapping groups"] --> ASSEMBLE
  RUN --> ASSEMBLE
  ASSEMBLE --> ADAPTER["NDJSON or CSV bundle adapter"]
  ADAPTER --> ART["ExportArtifact"]
  ART --> DOWN["Downstream consumer"]
```

Preflight resolves the profile's selected fields against the current available/required contract before expensive assembly begins. The run persists diagnostics and configuration so an artifact can be explained later.

Generic entity export takes a parallel but simpler path: entity graph → validated field/filter/order selection → streamed flat CSV.

## 8. Market crawl

```mermaid
sequenceDiagram
  actor Operator
  participant API as Market monitoring API
  participant DB as PostgreSQL
  participant Q as Scraping queue
  participant B as Crawl batch worker
  participant Site as External market site

  Operator->>API: Start source crawl with scope
  API->>DB: Reject concurrent active run for source
  API->>DB: Snapshot source config and listing ids
  API->>DB: Create persisted crawl batches
  API->>Q: Dispatch run id
  Q->>B: Dispatch batch ids
  loop each listing
    B->>Site: Fetch via configured strategy/proxy policy
    Site-->>B: HTML/JSON-LD response
    B->>B: Extract, normalize and validate fields
    alt success
      B->>DB: Update latest listing state
      B->>DB: Append numeric price observation when changed
    else failure
      B->>DB: Update health/error without replacing last successful values
      B->>DB: Aggregate crawl issue
    end
  end
  B->>DB: Finalize batch and run counters/source health
```

Listing ids are fixed when a run is created, so later listing edits do not change the workset in flight. One source cannot have two pending/running crawl runs. Browser and stealth work remains isolated on the scraping runtime.

## 9. Price analytics

```mermaid
flowchart LR
  VIEW["SavedAnalysisView config"] --> Q["Validated live query"]
  Q --> LEG1["Source + PriceType + Currency leg A"]
  Q --> LEG2["Source + PriceType + Currency leg B"]
  LEG1 --> SAME{"Same source?"}
  LEG2 --> SAME
  SAME -->|yes| PROD["Join ProductPrice by product"]
  SAME -->|no| MAP["Intersect through active MappingGroup members"]
  PROD --> METRICS["Rows, summary, density, distribution"]
  MAP --> METRICS
```

Saved views preserve query intent, not stale result sets. The result reflects current catalog, mapping, and price data when the analysis runs.

## 10. Scheduled execution and queue routing

```mermaid
sequenceDiagram
  participant Beat as Celery Beat
  participant DB as PostgreSQL
  participant Dispatch as Scheduling dispatcher
  participant Registry as Handler registry
  participant Domain as Domain handler
  participant Q as Celery queue

  Beat->>DB: Read due PeriodicTask
  Beat->>Dispatch: dispatch_scheduled_task(id)
  Dispatch->>DB: Load active ScheduledTask
  Dispatch->>Registry: Resolve handler_key
  Registry-->>Dispatch: Registered callable
  Dispatch->>Domain: Invoke with schedule config
  Domain->>DB: Validate domain object and create run
  Domain->>Q: Dispatch domain task
```

Queue routing is centralized in backend settings:

| Queue | Work |
| --- | --- |
| default | General scheduled handlers, imports, exports, pricing, apply/orchestration work |
| `enrichment` | `execute_enrichment_run_task` |
| `media` | `process_ingestion_run_task` |
| `scraping` | Market crawl run and batch tasks |

Handler keys are stable database configuration. Celery task names and queue routing are execution infrastructure. Keeping them separate lets deployments change worker topology without rewriting schedule records.

## How to trace a running operation

1. Locate the domain run record and confirm its status, trigger, timestamps, and configuration snapshot.
2. Compare total/processed/succeeded/failed counters with child item or batch states.
3. Inspect grouped issues first, then sample record-level issues/items.
4. Confirm the expected queue and worker processed the task name.
5. Inspect output rows or artifacts only after the run reaches its final state.
6. Use [History](./history) for user/domain edits; use domain run issues and snapshots for bulk-engine diagnostics.
