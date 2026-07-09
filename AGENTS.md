# BAS Documentation

## Documentation Targets

This Docusaurus project has two documentation targets:

- **Public docs**: customer Help Center and customer-safe integration reference.
- **Internal docs**: public docs plus implementation, support, engineering, architecture, operations, and decisions.

The default `docusaurus.config.ts` is the public build and must only include
`content/public`.

`docusaurus.internal.config.ts` is the internal build and may include the full
`content` tree.

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

The public build runs `scripts/validate-public-build.mjs` after Docusaurus
build. Keep that check strict so accidental internal content leaks fail CI.

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
