.env file contains TEST_PLAN_ID to run test cases, which can be un-run/failed
cmd
  npx playwright test ./tests --project="Google Chrome"

NOTES:
- Run test from cursor in VSCode not run global setup https://github.com/microsoft/playwright/issues/32121