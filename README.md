# Vitest browser mode: a click cancelled by bail lands in the next run

```sh
pnpm install
pnpm exec playwright install chromium
pnpm repro
```

`repro.mjs` drives one Vitest instance through two runs, as Stryker's vitest runner does:

1. `clicker.test.js` clicks its own button in a loop. `fail-fast.test.js` fails after 1 s, and `bail: 1` cancels the run.
2. `victim-a.test.js` and `victim-b.test.js` each render a button and click nothing.

Expected: both victims pass.
Actual: one victim fails with `expected 1 to be +0`. It received the click that `clicker.test.js` sent in run 1.

`BAIL=0 pnpm repro` passes, because nothing is cancelled mid-click.
