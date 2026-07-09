# Frontend Architecture

The frontend is a modular React admin interface.

## Code Direction

```text
shared -> modules -> app
```

Modules should not import from other modules directly. Shared code must not import from modules or app code.

## Main Areas

- `src/app`: routing, layout, providers, registry, app state.
- `src/modules`: business modules and pages.
- `src/features/entity-crud`: reusable CRUD screens.
- `src/shared`: shared UI, API client, generated types, hooks.

## Important Concept

Many resources use generic CRUD screens driven by module manifests or backend metadata. Complex workflows such as imports, pricing, and market monitoring can use custom pages.

