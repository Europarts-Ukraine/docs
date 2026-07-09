# Mappings

Mappings help the system identify records from different sources that represent the same real-world entity.

For example, the same product can appear in several supplier feeds with different names, codes, or categories. Mapping rules group those records so the platform can reason about them together.

## Common Tasks

- review mapping runs;
- inspect mapping groups;
- resolve conflicts;
- confirm that two records are the same;
- mark two records as different;
- exclude broken source records from matching.

## Human Decisions

Automatic matching is not always enough. Users can create manual decisions:

- **positive override**: records must be treated as the same;
- **negative override**: records must be treated as different;
- **exclusion**: a record should be ignored by mapping.

Manual decisions are kept as part of the audit trail and should not be silently overwritten by later automated runs.

## Boundary

Mapping answers the question: “Which records describe the same entity?”

It does not decide the final product name, description, price, or channel content.

