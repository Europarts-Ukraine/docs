# PAD Documentation

## Documentation Targets

This Docusaurus project has two production documentation targets and one local
development workspace:

- **Public docs**: customer Help Center and customer-safe integration reference.
- **Internal docs**: implementation, support, engineering, architecture,
  operations, and decisions. It must not include public documentation routes.
- **Workspace**: local-only union of both content trees for navigation and QA.

The default `docusaurus.config.ts` is the public build and must only include
`content/public`.

`docusaurus.internal.config.ts` is the internal build and must include only
`content/internal` through the docs include patterns.

`docusaurus.workspace.config.ts` is a development convenience. It may include
the full `content` tree, but must never be used as a production deployment.
Keep its `baseUrl` set to `/`; it must not inherit the internal GitHub Pages
project prefix.

## Content Rules

Public documentation must be task-based and safe for customers. Do not include:

- source-code paths as required user knowledge;
- Django, React, database, Docker, deployment, or server internals;
- secrets, credentials, private endpoints, or implementation-only behavior;
- internal support or engineering procedures.

Internal documentation may reference code, architecture, deployment, support
playbooks, and implementation procedures.

## Shared UI Safety

Files under `src/` are shared by both public and internal builds. Treat them as
public-safe. Do not put internal-only copy, private links, implementation notes,
or LLM/internal prompts in shared React pages, components, or CSS.

Internal-only landing pages, LLM instructions, playbooks, engineering notes, and
architecture details belong under `content/internal`.

Short audience-gateway labels and card summaries may live in the matching
Docusaurus config's `customFields`; shared React components must only render
that data generically.

The public build runs `scripts/validate-public-build.mjs` after Docusaurus
build. Keep that check strict so accidental internal content leaks fail CI.

Public, internal, and workspace development use different Docusaurus configs.
Keep `future.faster.rspackPersistentCache` disabled in every active config: a
persistent Rspack module graph can become invalid when the same workspace
switches between content trees. The in-process Rspack compiler remains enabled.

The workspace has two sidebars. Internal pages must only use
`internalSidebar`; public pages must only use `publicSidebar`. Cross-audience
navigation belongs on the workspace root and in the workspace navbar, not in
either product sidebar.

## URL Rules

Public documentation must be available under `/docs/public/...`.

Internal documentation must be available under `/docs/internal/...`.

The internal build may include both trees. The public build must include only
the public tree.

## Structure

Use these areas:

```text
content/public/
content/public/integrations/
content/internal/implementation/
content/internal/support/
content/internal/engineering/
content/internal/architecture/
content/internal/operations/
content/internal/decisions/
```

When a new documentation convention or publishing rule is introduced, record it
here instead of leaving it only in chat history.

## Architecture Documentation Conventions

Internal architecture pages describe the current implemented system and are
source-backed. Keep the following pages synchronized when an application,
cross-module contract, or runtime flow changes:

- `content/internal/architecture/system-overview.md` for product and runtime
  boundaries;
- `content/internal/architecture/domain-model.md` for the domain mental model;
- `content/internal/architecture/backend-applications.md` for Django app
  ownership and dependencies;
- `content/internal/architecture/runtime-data-flows.md` for cross-application
  sequences;
- the focused mechanism page for registry, entity graph, RBAC, history, or
  soft-delete behavior.

Use Mermaid for relationships and sequences that are materially clearer as a
diagram. Every diagram must be accompanied by prose that explains its meaning.
Prefer stable concepts, contracts, and ownership boundaries over file-by-file
inventories. Source paths may be included as navigation aids for engineers.

## Documentation Visual System

The shared documentation UI uses a PAD-owned neutral visual identity. Do not
reintroduce Docusaurus starter logos, illustrations, social cards, or copy.

- Keep light and dark theme tokens centralized in `src/css/custom.css`.
- Light mode is a white neutral interface; dark mode is a true near-black
  interface. Check contrast and focus states in both modes.
- Use light mode as the default and do not let the operating-system preference
  override it on a visitor's first load. Keep the manual theme switch available.
- Use Docusaurus' native compact mobile docs sidebar and keep mobile layout
  fixes scoped below the desktop breakpoint. Do not change desktop sidebar
  expansion, controls, or spacing to solve a mobile navigation problem.
- Shared landing and layout components under `src/` must remain public-safe.
- Put internal landing-page copy and links in `content/internal/intro.mdx`, and
  pass them into generic shared components as data.
- Use the `pad-mark-*`, `favicon.svg`, and `pad-social-card.svg` assets for PAD
  documentation identity.

## Deployment Documentation Status

PAD does not yet have an approved production deployment target. Keep
`content/internal/operations/deployment-model.md` framed as a proposed
implementation until an explicit architecture decision is approved.

- The working product direction is one isolated installation per customer, not
  application-level multitenancy.
- Managed cloud, customer-hosted, hybrid, cloud provider, orchestrator,
  isolation boundary, backup, release, and support choices are open decisions.
- State repository-backed application constraints as facts, but label proposed
  infrastructure as a hypothesis.
- Keep consultant interview questions, meeting preparation, and requested
  deliverables out of product documentation.
- `backend/docker-compose.yml` and `backend/docker-compose.dev.yml` are local
  development assets and must not be described as production deployment
  packages.
- After approval, record the choice as an ADR and update Operations,
  onboarding, and architecture documentation together.

## Internal Documentation Publishing

The internal documentation is published as the GitHub project Pages site for
`Europarts-Ukraine/docs`:

- canonical URL: `https://europarts-ukraine.github.io/docs/`;
- source branch: `main`;
- build command: `pnpm run build:internal`;
- published artifact: `build-internal`;
- deployment workflow: `.github/workflows/pages.yml`.

Keep `docusaurus.internal.config.ts` configured with
`url: 'https://europarts-ukraine.github.io'` and `baseUrl: '/docs/'` while the
site uses the GitHub project URL. Keep the internal docs `routeBasePath` set to
`'/'`: the repository base URL already provides `/docs/`, so adding another
`docs` route segment would incorrectly produce `/docs/docs/internal/...`. Do not
deploy the workspace build. If a custom domain is introduced later, update
`url`, `baseUrl`, and the route layout together.
