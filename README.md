# PAD Platform Documentation

This Docusaurus project contains two isolated documentation products and one
development workspace:

- **Public docs**: customer Help Center and customer-safe integration reference.
- **Internal docs**: implementation, support, engineering, architecture,
  operations, and decisions for the PAD team.
- **Workspace**: local-only gateway that exposes both products with separate
  sidebars.

The public build must not expose source code, deployment internals, private architecture notes, secrets, or implementation-only behavior.

## Installation

```bash
pnpm install
```

## Local Development - Combined Workspace

```bash
pnpm start
```

The default development server uses `docusaurus.workspace.config.ts`. Open
`http://localhost:3000/`, then choose internal or public documentation.

Inside either documentation product, the logo returns to the workspace root.
The left sidebar only shows pages for the current audience.

## Local Development - Public Docs Only

```bash
pnpm start:public
```

Public docs use `docusaurus.config.ts` and `content/public`. Open
`http://localhost:3000/docs/public/intro`.

## Local Development - Internal Docs

```bash
pnpm start:internal
```

Internal docs use `docusaurus.internal.config.ts`. Only `content/internal` is
included in this target. Open
`http://localhost:3001/docs/internal/intro`.

The development targets intentionally do not share Rspack's persistent
module graph. If an older checkout already has a corrupted cache, run
`pnpm clear` once before starting either target.

## Build

```bash
pnpm build:public
pnpm build:internal
```

Public output is written to `build`. Internal output is written to `build-internal`.
`build:workspace` exists for local QA only and must not be deployed.

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

Public documentation is for customers and everyday users of PAD Platform. It is
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

Internal documentation is for the PAD Platform team. It is published from the
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
components or JSX inside the document. Most PAD docs should stay as `.md`
because they are easier to edit, review, and move between systems.

### Safety Rule

Files under `src/` are shared by both builds, so treat them as public-safe.
Internal-only content belongs under `content/internal`.

`pnpm build:public` runs a privacy check after the Docusaurus build and fails if
internal-only markers appear in the generated public site.
