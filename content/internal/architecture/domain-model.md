# Domain Model

This page is the conceptual model of PAD Platform. It explains what the central records mean and which records must not be treated as interchangeable.

## Core mental model

| Concept | Meaning |
| --- | --- |
| `Source` | A business origin for catalog data, usually a supplier or internal source system |
| `SupplierFeed` | A concrete extract from a source, bound to a credential connection and a stable raw dataset identity |
| `Product` | A source-specific sellable record identified by `source + source_key`; it remains owned by that source |
| `ProductModel` | A model-level record within the catalog hierarchy; attribute values can belong to a product or product model |
| `MappingGroup` | A set of source records considered equivalent by a published mapping run |
| `MappingTarget` | A normalized classification target, such as a canonical brand or category projection |
| `Channel` | A publication context with assortment rules, locales, price types, and catalog projections |
| `ProductChannelEnrichment` | Channel-and-locale-specific publishable copy for one product |
| `PriceType` | A logical price list; manual, imported, supplier, competitor, channel, and calculated prices use the same abstraction |
| `MarketListing` | A monitored external product URL and its latest observed market state; it is not an internal product |
| Run record | A durable execution instance with a configuration snapshot, lifecycle state, counters, and diagnostics |

The most important distinction is:

```mermaid
flowchart LR
  SP1["Product from source A"] --> G["MappingGroup: equivalent identity"]
  SP2["Product from source B"] --> G
  SP3["Product from source C"] --> G
  G --> CH["Channel chooses representative product"]
  CH --> CE["Channel content by locale"]
  CH --> OUT["Exported offer rows"]
```

A mapping group records equivalence. It does not create or own a separate golden product row. The original products remain available for supplier-specific stock, prices, assets, attributes, and content.

## Source and import identity

```mermaid
erDiagram
  SOURCE ||--o{ SUPPLIER_FEED : owns
  CREDENTIAL_CONNECTION ||--o{ SUPPLIER_FEED : reads_through
  SUPPLIER_FEED ||--o{ IMPORT_PROFILE : configures
  IMPORT_PROFILE ||--o{ IMPORT_TARGET : contains
  IMPORT_PROFILE ||--o{ IMPORT_RUN : executes
  IMPORT_RUN ||--o{ IMPORT_TARGET_RESULT : reports
  IMPORT_RUN ||--o{ IMPORT_ISSUE : diagnoses
  IMPORT_RUN ||--o{ IMPORT_ARTIFACT : produces

  SOURCE {
    string code
    string name
    boolean is_active
  }
  SUPPLIER_FEED {
    json source_config
    string raw_table
    boolean is_active
  }
  IMPORT_PROFILE {
    string mode
    json configuration
    boolean locked_after_success
  }
  IMPORT_RUN {
    string status
    json config_snapshot
    datetime started_at
    datetime finished_at
  }
```

`Source` is business identity; `CredentialConnection` is connection technology and secrets; `SupplierFeed` joins them into a repeatable dataset. Supplier-mode imports preserve a stable raw-table identity so a successful run can atomically replace the previous snapshot and calculate missing-record behavior against it.

An import profile describes how source fields become target fields. An import run captures the actual profile configuration used for one execution. This prevents later profile edits from changing the meaning of an earlier run.

## Catalog model

```mermaid
erDiagram
  SOURCE ||--o{ PRODUCT : owns
  SOURCE ||--o{ CATEGORY : owns
  SOURCE ||--o{ BRAND : owns
  CATEGORY_TREE ||--o{ CATEGORY : contains
  CATEGORY o|--o{ CATEGORY : parent_of
  BRAND_SET ||--o{ BRAND : contains

  FAMILY ||--o{ FAMILY_ATTRIBUTE : defines
  ATTRIBUTE ||--o{ FAMILY_ATTRIBUTE : included_as
  FAMILY ||--o{ FAMILY_VARIANT : has
  FAMILY_VARIANT ||--o{ FAMILY_VARIANT_AXIS : uses
  ATTRIBUTE ||--o{ FAMILY_VARIANT_AXIS : axis
  FAMILY ||--o{ PRODUCT_MODEL : classifies
  FAMILY_VARIANT o|--o{ PRODUCT_MODEL : variant

  PRODUCT_MODEL o|--o{ PRODUCT : models
  FAMILY o|--o{ PRODUCT : classifies
  CATEGORY o|--o{ PRODUCT : primary_category
  BRAND o|--o{ PRODUCT : primary_brand
  PRODUCT ||--o{ PRODUCT_CATEGORY : classified_as
  CATEGORY ||--o{ PRODUCT_CATEGORY : includes
  PRODUCT ||--o{ PRODUCT_BRAND : branded_as
  BRAND ||--o{ PRODUCT_BRAND : includes

  ATTRIBUTE_SET ||--o{ ATTRIBUTE_GROUP : groups
  ATTRIBUTE_SET ||--o{ ATTRIBUTE : defines
  ATTRIBUTE_GROUP o|--o{ ATTRIBUTE : organizes
  ATTRIBUTE ||--o{ ATTRIBUTE_OPTION : allows
  ATTRIBUTE ||--o{ ATTRIBUTE_VALUE : stores
  PRODUCT o|--o{ ATTRIBUTE_VALUE : has
  PRODUCT_MODEL o|--o{ ATTRIBUTE_VALUE : has
  ATTRIBUTE_VALUE ||--o{ ATTRIBUTE_VALUE_OPTION : selects
  ATTRIBUTE_OPTION ||--o{ ATTRIBUTE_VALUE_OPTION : selected

  PRODUCT ||--o{ PRODUCT_STOCK : stocked_as
  WAREHOUSE ||--o{ PRODUCT_STOCK : holds
```

The catalog supports both scalar convenience relations (`Product.category`, `Product.brand`) and explicit many-to-many projections (`ProductCategory`, `ProductBrand`). Mapping target publication writes normalized brand/category projections into the junction tables while preserving source classifications.

Attribute values may be localized or channel-specific and may belong to a product or product model. Families define which attributes apply; variants define which attributes act as axes.

## Identity resolution and classification projection

The mappings application owns two related but different outputs.

### Product identity groups

`MappingDefinition` selects sources and rules. A `MappingRun` snapshots those rules and produces `MappingGroup` and `MappingGroupMember` rows. The engine uses eligibility, normalization, candidate generation, compatibility/rejection rules, ambiguity resolution, constraints, and manual overrides.

```mermaid
flowchart LR
  DEF["MappingDefinition + published rules"] --> RUN["MappingRun snapshot"]
  OV["Positive, negative and exclusion overrides"] --> RUN
  RUN --> CAND["Candidates and constraints"]
  CAND --> GROUPS["MappingGroups"]
  GROUPS --> CH["Channel assortment"]
  GROUPS --> ANA["Cross-source analytics"]
  GROUPS --> ENR["Content fallback across siblings"]
  GROUPS --> EXP["Offer grouping in feeds"]
```

### Normalized targets

`MappingTarget` and `MappingTargetAssignment` project source classifications into normalized brand/category values. Manual assignments override mapped projections; source product classifications remain the fallback for channel behavior.

Identity groups answer “which source products represent the same thing?” Target projections answer “which normalized classification should this source value use?”

## Channel publication model

```mermaid
erDiagram
  CHANNEL ||--o{ CHANNEL_LOCALE : publishes_in
  CHANNEL ||--o{ CHANNEL_PRICE_TYPE : selects
  PRICE_TYPE ||--o{ CHANNEL_PRICE_TYPE : exposed_as
  PRODUCT ||--o{ PRODUCT_CHANNEL_ENRICHMENT : published_copy
  CHANNEL ||--o{ PRODUCT_CHANNEL_ENRICHMENT : scopes
  LOCALE ||--o{ PRODUCT_CHANNEL_ENRICHMENT : localizes
  CHANNEL ||--o{ EXPORT_PROFILE : feeds

  CHANNEL {
    json scope_rules
    json supplier_priority
  }
  PRODUCT_CHANNEL_ENRICHMENT {
    string name
    text description
    string slug
    boolean is_archived
    string last_fill_method
  }
```

A channel is a publication context, not a copy of the catalog. Assortment synchronization evaluates scope rules and uses mapping groups plus `supplier_priority` to choose a representative source product. It creates or unarchives an enrichment row for every active channel locale and archives rows that leave scope. Existing content is preserved across synchronization.

Content fields live on `ProductChannelEnrichment`, separate from source/base data. They can be filled manually, copied from the best available mapped sibling, or generated by an AI enrichment run. `is_archived` expresses assortment membership; field completeness is calculated from actual content.

## Pricing model

```mermaid
erDiagram
  CURRENCY ||--o{ EXCHANGE_RATE : base
  CURRENCY ||--o{ EXCHANGE_RATE : quote
  PRICE_TYPE ||--o{ PRICE_TYPE_CURRENCY : supports
  CURRENCY ||--o{ PRICE_TYPE_CURRENCY : allowed
  PRICE_TYPE ||--o{ PRODUCT_PRICE : contains
  PRODUCT ||--o{ PRODUCT_PRICE : priced
  PRICE_TYPE ||--o{ PRICING_RULE : target
  PRICING_RULE ||--o{ PRICE_CALCULATION_RUN : executes
  PRICE_CALCULATION_RUN ||--o{ PRICE_CALCULATION_ERROR : reports
  PRICE_RECALCULATION_GROUP ||--o{ PRICE_TYPE : schedules
```

`PriceType` is the stable abstraction for a price list. A `ProductPrice` stores one product value for a price type/currency context. `PricingRule` derives a target price type from other prices and product data using a restricted condition/formula DSL. A preview run stores calculated results; applying it atomically replaces rule-generated target values.

Channels select price types. They do not own price calculation logic.

## Translations, enrichment, and assets

- `translations` stores locale-specific fields for catalog taxonomies, products, models, families, and variants.
- `enrichment` orchestrates copy-from-base and AI generation into `ProductChannelEnrichment`; configuration and every run are snapshotted.
- `dam` stores deduplicated assets and links them to concrete source products. Import media mappings create ingestion work after a successful product import.

Assets remain tied to concrete products. Mapping groups can inform downstream selection, but DAM does not move asset ownership to a synthetic master product.

## Market observation and analytics

`MarketSource` describes one external website and extraction/request strategy. `MarketListing` represents one explicit URL, its latest extracted fields, and crawl health. `MarketPriceHistory` records numeric observations when price or availability changes. Crawl runs split listing ids into persisted batches and group issues by stage and code.

Market listings are deliberately separate from internal products. Market monitoring collects observations; identity matching belongs to a separate business workflow.

Analytics stores reusable `SavedAnalysisView` configuration and computes results from live product prices. Same-source comparisons join product prices directly. Cross-source comparisons intersect products through active mapping groups.

## Custom schema model

```mermaid
flowchart TB
  ED["EntityDefinition"] --> DDL1["custom_{code}_ table"]
  FD["FieldDefinition"] --> DDL1
  FD --> J["M2M junction table when required"]
  CFD["CustomFieldDefinition"] --> SYS["Column on supported system table"]
  DDL1 --> API["Dynamic row API"]
  DDL1 --> HIST["Dynamic history table"]
  ED --> REG["Dynamic frontend module"]
  ED --> GRAPH["Entity graph descriptor"]
```

Custom entity definitions are metadata backed by real PostgreSQL tables created through validated DDL. Runtime unmanaged Django models expose the rows through a generic API. Custom fields extend supported system tables and appear in the module registry and entity graph like ordinary fields.

## Repeating operational pattern

Most high-volume workflows use the same observable shape:

| Layer | Purpose | Examples |
| --- | --- | --- |
| Definition/profile | Reusable operator configuration | ImportProfile, MappingDefinition, PricingRule, ExportProfile |
| Run | One execution with snapshot and lifecycle | ImportRun, MappingRun, PriceCalculationRun, EnrichmentRun, MarketCrawlRun, ExportRun |
| Item/result | Per-target or per-record progress | ImportTargetResult, EnrichmentRunItem, MarketCrawlBatch |
| Issue/error | Actionable diagnostics | ImportIssue, MappingConflict, PriceCalculationError, MarketCrawlIssue, ExportRunIssue |
| Artifact/output | Durable result | ImportArtifact, ExportArtifact, MappingGroup, ProductPrice, channel enrichment rows |

This pattern is the preferred mental model for tracing asynchronous behavior: begin with the run, inspect its snapshot, then its counters, items/issues, and final output.
