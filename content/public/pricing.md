# Pricing

Pricing manages currencies, VAT, price types, product prices, and pricing rules.

The pricing engine transforms one price type into another. For example:

```text
purchase price -> base price -> retail price
```

## Common Tasks

- create or review price types;
- inspect product prices;
- validate pricing rules;
- start a price recalculation;
- review calculation errors;
- understand why a price did or did not change.

## Price Types

A price type is a logical price list. It can represent:

- purchase prices;
- imported supplier prices;
- manual prices;
- calculated retail prices;
- marketplace prices;
- competitor prices;
- channel-specific prices.

## Protection Rules

Manual and imported prices should not be overwritten by calculated rule prices unless the system is explicitly configured to do so.

## Troubleshooting

If prices were not updated:

1. check the calculation run status;
2. review calculation errors;
3. check whether the target price type allows calculated prices;
4. check whether the product matched an active rule;
5. check whether required base prices or fields are missing.

