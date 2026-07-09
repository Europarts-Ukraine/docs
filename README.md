# BAS Platform Documentation

This Docusaurus project contains two documentation builds:

- **Public docs**: customer Help Center and customer-safe integration reference.
- **Internal docs**: public docs plus implementation, support, engineering, architecture, operations, and decisions.

The public build must not expose source code, deployment internals, private architecture notes, secrets, or implementation-only behavior.

## Installation

```bash
pnpm install
```

## Local Development - Public Docs

```bash
pnpm start
```

Public docs use `docusaurus.config.ts` and `content/public`.

## Local Development - Internal Docs

```bash
pnpm start:internal
```

Internal docs use `docusaurus.internal.config.ts` and the full `content` tree.

## Build

```bash
pnpm build:public
pnpm build:internal
```

Public output is written to `build`. Internal output is written to `build-internal`.

## Content Layout

```text
content/
  public/
    integrations/
  internal/
    implementation/
    support/
    engineering/
    architecture/
    operations/
    decisions/
```

## Documentation Model

This repository keeps two documentation products in one Docusaurus project.
They are built and published separately.

### Public User Documentation

Public documentation is for customers and everyday users of BAS Platform. It is
published from `content/public` and is available under `/docs/public/...`.

It should contain:

- getting started and product overview;
- catalog workflows;
- import workflows and import error explanations;
- mapping conflict workflows;
- pricing workflows;
- channels and exports;
- users, roles, and access explanations;
- history and audit explanations;
- troubleshooting and FAQ;
- customer-safe integration reference.

It must not contain:

- source-code paths as required knowledge;
- backend, frontend, database, Docker, server, or deployment internals;
- internal support playbooks;
- architecture decisions;
- private implementation notes;
- LLM/internal prompts;
- secrets, credentials, or private endpoints.

### Internal Developer Documentation

Internal documentation is for the BAS Platform team. It is published from the
full `content` tree and is available under `/docs/internal/...`, while also
including the public docs under `/docs/public/...`.

It should contain:

- implementation guides for onboarding new clients;
- support playbooks and escalation rules;
- backend development notes;
- frontend development notes;
- API schema synchronization;
- architecture overview;
- RBAC, history, soft-delete, entity graph, and module registry details;
- deployment and operations notes;
- architecture decisions and product boundaries.

### URL Convention

Use these URL roots:

```text
/docs/public/...   customer-safe documentation
/docs/internal/... private team documentation
```

Public pages should live directly under `content/public` or in a public
subfolder such as `content/public/integrations`.

Internal pages should live under `content/internal`.

### Markdown vs MDX

Use `.md` for normal documentation. Use `.mdx` only when a page needs React
components or JSX inside the document. Most BAS docs should stay as `.md`
because they are easier to edit, review, and move between systems.

### Safety Rule

Files under `src/` are shared by both builds, so treat them as public-safe.
Internal-only content belongs under `content/internal`.

`pnpm build:public` runs a privacy check after the Docusaurus build and fails if
internal-only markers appear in the generated public site.
