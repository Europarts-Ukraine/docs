# Frontend Development

The frontend uses React, TypeScript, Vite, TanStack Query, React Router, Tailwind CSS, generated OpenAPI types, and centralized API clients.

## Local workflow

From `frontend/`:

```bash
pnpm install
pnpm dev
```

The frontend uses `VITE_API_URL` when configured; otherwise API calls use the current origin. Ensure the backend API is available and that the local routing/proxy setup matches the chosen environment.

## Code map

```text
frontend/src/
├── app/       # providers, layout, navigation, registry and top-level routes
├── features/  # reusable cross-domain behavior such as entity CRUD
├── modules/   # business-owned manifests, hooks, components and pages
└── shared/    # UI primitives, generated types and API boundaries
```

The dependency direction is `shared → features/modules → app`. Shared code cannot depend on business modules or the composition root.

## Choosing the UI pattern

Use registry-driven generic CRUD for conventional resource lists, forms, details, relations, soft-delete administration, and history. Use a purpose-built page when the interaction is an orchestration workflow such as import mapping, pricing preview/apply, enrichment review, crawl diagnostics, or export artifacts.

Both patterns must use:

- generated OpenAPI transport types;
- `typedApiClient`, or the centralized `dynamicApiClient` for registry-built paths/binary downloads;
- TanStack Query for server state;
- stable module/RBAC keys;
- the shared navigation/layout contracts.

## Adding a system capability

1. Synchronize the backend schema and generated types.
2. Add API hooks and UI to the owning folder under `src/modules/`.
3. Add/update its `ModuleDefinition` when it participates in registry-driven routing.
4. Compose a new manifest in `src/app/registry/system-modules.ts`.
5. Place the user-facing workflow in `src/app/navigation/navigation-schema.ts`.
6. Add explicit router entries before generic `:moduleKey` routes when the workflow needs custom URLs.
7. Verify read-only/write roles, hidden navigation, direct URL access, loading, empty, error, and long-run states.

Dynamic custom entities are created from backend definitions at runtime and do not require a handwritten manifest per entity.

## API and state rules

- Do not edit `frontend/openapi/api.yml` or `src/shared/types/api.generated.ts` by hand.
- Do not create handwritten copies of backend request/response DTOs.
- Handwritten types are valid for form drafts, selection, view models, or other frontend-owned state that intentionally differs from transport data.
- Keep direct Axios imports inside `src/shared/lib/api`.
- Invalidate the narrowest relevant query keys after mutations; the backend remains authoritative.
- For background work, query the durable run resource instead of assuming task dispatch means success.

## Verification

From `frontend/`:

```bash
pnpm check:api-types
pnpm lint
pnpm build
```

Run `pnpm api:sync` first when the backend contract changed. See [API Schema Synchronization](./api-sync).

## Review checklist

- The feature remains inside its owning module and respects import direction.
- API calls use generated types and the correct client boundary.
- Navigation, route, manifest, and backend RBAC keys agree.
- Forms distinguish frontend validation from backend contract validation.
- Generic CRUD is used where metadata is sufficient; complex workflows have explicit pages.
- Query invalidation and long-running states are observable.
- Lint and production build pass.

