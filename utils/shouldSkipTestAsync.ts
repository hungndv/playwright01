import { Constants } from '../Constants';
import { promises } from 'fs';
import test from '@playwright/test';

async function shouldSkipTestAsync(test) {
  console.log(`Running "${test.info().title}"`);

  const data = await promises.readFile(Constants.FILE_TEST_CASE_IDS, { encoding: 'utf8' });
  const runningCaseIds: number[] = JSON.parse(data);

  const caseId: number = Number(test.info().title.match(/\[(\d+)\]/)?.pop());
  if (runningCaseIds.length > 0 && !runningCaseIds.includes(caseId)) {
    test.skip();
  }
}

export default shouldSkipTestAsync;