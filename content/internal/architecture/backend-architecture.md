# Backend Architecture

The backend is a Django REST API organized into domain apps.

## Important Platform Mechanisms

- soft delete and purge;
- history tracking;
- RBAC by module key;
- custom entities with PostgreSQL DDL;
- entity graph;
- high-volume import engine;
- pricing calculation runs;
- export adapters;
- scheduled and asynchronous jobs.

## Main Domain Apps

- `entities`
- `product_sources`
- `imports`
- `mappings`
- `custom_entities`
- `translations`
- `enrichment`
- `pricing`
- `market_monitoring`
- `channels`
- `exports`
- `users`
- `entity_history`
- `credentials`
- `scheduling`

