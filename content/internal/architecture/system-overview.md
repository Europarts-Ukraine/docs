# System Overview

BAS Platform is an internal operational system for ecommerce product and commercial data.

## Core Flow

```text
Data sources
  -> product sources and supplier feeds
  -> imports
  -> catalog / PIM
  -> custom entities and custom fields
  -> mappings / identity resolution
  -> translations and enrichment
  -> pricing
  -> channels
  -> exports
```

## Main Applications

- `backend`: Django REST API, business logic, data models, imports, pricing, mapping, exports, RBAC, history.
- `frontend`: React admin interface for backend workflows.
- `docs`: documentation system.
- `website`: public marketing/company website.
- `storefront`: reusable B2B/public storefront.

