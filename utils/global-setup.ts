import { Constants } from './constants';
import { DirUtils } from './dir-utils';
import type { FullConfig } from '@playwright/test';
import { constants } from 'buffer';
import path from 'path';
import { promises } from 'fs';

async function globalSetup(config: FullConfig) {
  DirUtils.removeAndCreateDir(Constants.FOLDER_AUTO_FILES);

  const { TEST_PLAN_ID } = process.env;
  console.log(`=========>>> globalSetup - TEST_PLAN_ID - ${TEST_PLAN_ID}`);
  const TEST_CASE_IDS: number[] = TEST_PLAN_ID ? [1, 2, 3, 10] : [];
  const tcIdsStr = JSON.stringify(TEST_CASE_IDS);
  console.log(`=========>>> globalSetup - TEST_CASE_IDS - ${tcIdsStr}`);

  promises.writeFile(Constants.FILE_TEST_CASE_IDS, tcIdsStr, {
    flag: "w"
  }).then(() => {
    console.log("Finish Writing file...");
  });
}

export default globalSetup;