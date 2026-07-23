# Operations

Operations documentation describes deployment, monitoring, backups, and runtime maintenance.

## Current status

PAD does not yet have an approved production deployment architecture.

The working product direction is one isolated installation per customer rather
than application-level multitenancy. The hosting provider, isolation boundary,
managed versus customer-hosted responsibilities, orchestration platform,
provisioning workflow, release strategy, backups, observability, and support
model remain open decisions.

Use [Proposed Deployment Architecture](./deployment-model) for the
implementation currently under consideration. Record it as an ADR only after
the architecture is approved.
