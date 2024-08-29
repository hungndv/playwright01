import test, { expect } from '@playwright/test';

import getExcelData from '../utils/get-excel-data';
import shouldSkipTestAsync from '../utils/should-skip-test-async';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[6] Title 6', async ({ page }) => {
  var data = getExcelData("Product1", "Page2", "2");

});
