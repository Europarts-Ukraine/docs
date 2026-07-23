# Backend Development

The backend uses Django, Django REST Framework, PostgreSQL, Celery, and `uv`. Domain apps live directly under `backend/src/`.

## Local runtime

The recommended local workflow is Docker Compose from `backend/`:

```bash
docker compose up -d --build --wait
```

This starts PostgreSQL, Redis, the Django API, the default/enrichment worker, the media worker, Celery Beat, and the local database UI. Enable the browser-capable market worker only when needed:

```bash
docker compose --profile scraping up -d --build --wait
```

Useful local endpoints:

| Resource | URL |
| --- | --- |
| API root | `http://localhost:8000/api/v1/` |
| Swagger UI | `http://localhost:8000/api/v1/docs/` |
| OpenAPI schema | `http://localhost:8000/api/v1/schema/` |
| Django admin | `http://localhost:8000/admin/` |
| Supabase Studio | `http://localhost:3001/` |

Bootstrap the Admin role after the first migration:

```bash
uv run python manage.py bootstrap_rbac
```

The full environment and host-Python alternative are documented in `backend/docs/local-setup.md`.

## Where code belongs

| Change | Preferred location |
| --- | --- |
| Table shape, constraints, indexes, relations | owning app `models.py` + migration |
| Reusable business workflow | owning app `services.py` or `services/` |
| Query/read composition | selector/query service in the owning app |
| HTTP validation and representation | `serializers.py` / strict domain contracts |
| Request authorization and orchestration | `views.py` / `api.py` |
| Background adapter | `tasks.py`, loading a durable id and calling a service |
| Scheduled adapter | `handlers.py`, registered from `apps.py` |
| Cross-entity metadata | entity graph registration/descriptor behavior |

Use relative imports for project code under `src`. Cross-app code should call the owner app's service/query contract instead of duplicating its rules.

## Database and migration workflow

1. Encode the invariant in the model/constraint.
2. Run `makemigrations --check` before creating a migration to understand expected drift.
3. Create and inspect the migration; treat rename/remove operations as data migrations, not mechanical edits.
4. Apply migrations to the local PostgreSQL environment.
5. Test soft-delete, history, RBAC, and cross-app consumers when the model is exposed through the platform base contracts.

Bulk workflows should remain set-based and transactional according to their owning engine. Do not replace an import/pricing/mapping batch path with row-by-row ORM updates.

## Verification

Run checks proportional to the change from `backend/`:

```bash
uv run ruff check .
uv run python manage.py check
uv run pytest
```

Use focused pytest paths while iterating, then run the relevant broader suite. External clients should be mocked in unit/service tests; PostgreSQL-specific behavior must be exercised against PostgreSQL.

For an API contract change, also run:

```bash
uv run python manage.py spectacular --file openapi/api.yml --validate --fail-on-warn
```

Then complete [API Schema Synchronization](./api-sync).

## Review checklist

- The owning app and boundary are clear.
- Business logic is reusable outside the HTTP/task adapter.
- Querysets avoid N+1 behavior and supported paths have indexes.
- Mutating endpoints have the correct stable module key and write tests.
- Long work creates/updates a durable run and is safe to retry/claim.
- API errors use the shared problem contract.
- OpenAPI and frontend types are synchronized when transport changed.
- The relevant architecture/runtime-flow page still matches the implementation.

