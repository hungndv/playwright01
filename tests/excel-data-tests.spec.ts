import test, { expect } from '@playwright/test';

import getExcelData from '../utils/get-excel-data';
import shouldSkipTestAsync from '../utils/should-skip-test-async';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[6] Title 6', async ({ page }) => {
  var data = await getExcelData("Product1", "Page2", "2");

});

test('[7] Title 7', async ({ page }) => {
  var data = await getExcelData("Product1", "Page2", "2");

});

test('[8] Title 8', async ({ page }) => {
  var data = await getExcelData("Product1", "Page2", "2");

});

test('[9] Title 9', async ({ page }) => {
  var data = await getExcelData("Product1", "Page2", "2");

});

test('[10] Title 10', async ({ page }) => {
  var data = await getExcelData("Product1", "Page2", "2");

});
