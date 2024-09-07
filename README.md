# playwright01

## Install on Ubuntu

## Install Node Version Manager (nvm)

```Shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```
**Important:** CLOSE AND REOPEN TERMINAL to recognize the `nvm` command

## Install Node.js

```Shell
nvm install v20.17.0
# Upgrade the latest npm for node
nvm install-latest-npm
```

## Install playwright

```Shell
npm install -D @playwright/test@latest
# Also download new browser binaries and their dependencies
npx playwright install --with-deps
# check version
npx playwright --version
```

## Install packages from project root

```Shell
npm install
```

## Run test

```Shell
npx playwright test ./tests --project="Google Chrome"
```

# NOTES:
- .env file contains TEST_PLAN_ID to run test cases, which can be un-run/failed
- Run test from cursor in VSCode not run global setup <https://github.com/microsoft/playwright/issues/32121>
