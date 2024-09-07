Install playwright:

- npm install -D @playwright/test@latest

# Also download new browser binaries and their dependencies

- npx playwright install --with-deps
- npx playwright --version

Run source:

- clone
- npm install

NOTES:
.env file contains TEST_PLAN_ID to run test cases, which can be un-run/failed
cmd
  npx playwright test ./tests --project="Google Chrome"

- Run test from cursor in VSCode not run global setup <https://github.com/microsoft/playwright/issues/32121>
