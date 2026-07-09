# API Schema Synchronization

Frontend TypeScript API types are generated from the backend OpenAPI schema.

## Current Workflow

From `frontend/`:

```bash
pnpm api:sync
```

The generated file should not be edited manually.

## To Document

- how backend schema is generated;
- where the copied schema lives;
- how CI checks stale generated types;
- how to handle breaking API changes.

