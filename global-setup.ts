import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { TEST_PLAN_ID } = process.env;
  console.log(`=========>>> globalSetup - TEST_PLAN_ID - ${TEST_PLAN_ID}`);
}

export default globalSetup;