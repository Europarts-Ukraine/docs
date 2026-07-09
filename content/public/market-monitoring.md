# Market Monitoring

Market Monitoring tracks external product URLs and stores observed prices, availability, and related listing data.

It is used to compare market prices and provide pricing teams with external signals.

## Common Tasks

- create a market source;
- add monitored product URLs;
- start or review crawl runs;
- inspect listing data;
- review price history;
- investigate crawl issues.

## Boundary

Market Monitoring collects external listing data. It does not decide which internal product a listing belongs to. Matching and product identity belong to mapping and catalog workflows.

## Troubleshooting

If a listing is not updated:

1. check whether the URL is active;
2. review the latest crawl run;
3. inspect listing-level issues;
4. check whether the source is blocked or requires a different fetch strategy;
5. verify that the source host matches the configured source.

