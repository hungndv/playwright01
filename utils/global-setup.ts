import { Constants } from './constants';
import type { FullConfig } from '@playwright/test';
import { promises } from 'fs';

async function globalSetup(config: FullConfig) {
  const { TEST_PLAN_ID } = process.env;
  console.log(`=========>>> globalSetup - TEST_PLAN_ID - ${TEST_PLAN_ID}`);
  const TEST_CASE_IDS: number[] = TEST_PLAN_ID ? [1, 2, 3] : [];
  const tcIdsStr = JSON.stringify(TEST_CASE_IDS);
  console.log(`=========>>> globalSetup - TEST_CASE_IDS - ${tcIdsStr}`);

  promises.writeFile(Constants.FILE_TEST_CASE_IDS, tcIdsStr, {
    flag: "w"
  }).then(() => {
    console.log("Finish Writing file...");
  })
}

export default globalSetup;