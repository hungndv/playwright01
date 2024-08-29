import { Constants } from '../utils/constants';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';
import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';
import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

const records = parse(fs.readFileSync(path.join(__dirname, `../${Constants.FILE_DATA_CSV}`)), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {
  test(`${record.test_case}`, async ({ page }) => {
    console.log(record.test_case, record.some_value, record.some_other_value);
  });
}