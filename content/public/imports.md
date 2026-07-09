# Imports

Imports load data from files, databases, supplier feeds, or other configured sources into BAS Platform.

The import process is designed to protect business data. The system validates input before writing changes to the working catalog.

## Common Tasks

- upload or connect a data source;
- run a dry-run before applying changes;
- review validation errors;
- start a real import run;
- inspect import results;
- download diagnostic artifacts;
- understand what happened to missing supplier rows.

## Import Modes

**Simple import** is used for one-time uploads, corrections, and migrations.

**Supplier import** is used for recurring supplier feeds. It can compare the new feed with the previous successful supplier snapshot and apply configured missing-row behavior.

## Statuses

Typical run statuses:

```text
pending -> running -> finished
pending -> running -> failed
pending -> running -> cancelled
```

## Troubleshooting

If an import fails:

1. open the import run;
2. check blocking issues;
3. review row and field errors;
4. fix the source file or profile configuration;
5. run a dry-run again before applying changes.
