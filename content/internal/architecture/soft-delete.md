# Soft Delete

Most domain models support soft delete.

API deletion marks records as deleted instead of immediately removing rows from the database. Hard delete or purge is reserved for controlled admin flows and special cases.

## To Document

- default queryset behavior;
- restore behavior;
- purge behavior;
- custom entity DDL effects;
- history effects;
- support diagnostics.

