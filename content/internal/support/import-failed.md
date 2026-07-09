# Import Failed

Use this playbook when a customer reports that an import failed.

## First Checks

1. Open the import run.
2. Check status, phase, and timestamps.
3. Review blocking issues.
4. Check source file or connection metadata.
5. Confirm whether this was a dry-run or real run.
6. Verify whether business data was changed.

## Escalate To Engineering When

- the run failed without a clear issue;
- diagnostics are missing;
- a successful run caused inconsistent business data;
- the same valid profile fails repeatedly.

