import { expect, test } from './app1-test';

import shouldSkipTestAsync from '../utils/should-skip-test';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[6] Title 6', async ({ bootstrapFormPage }) => {
  var data = await bootstrapFormPage.getExcelData("Product1", "Page2", "2");

});

test('[7] Title 7', async ({ bootstrapFormPage }) => {
  var data = await bootstrapFormPage.getExcelData("Product1", "Page2", "2");

});

test('[8] Title 8', async ({ bootstrapFormPage }) => {
  var data = await bootstrapFormPage.getExcelData("Product1", "Page2", "2");

});

test('[9] Title 9', async ({ bootstrapFormPage }) => {
  var data = await bootstrapFormPage.getExcelData("Product1", "Page2", "2");

});

test('[10] Bootstrap From Controls 01', async ({ bootstrapFormPage, page }) => {
  await bootstrapFormPage.gotoUrl("https://getbootstrap.com/docs/5.0/forms/form-control/");
  var data = await bootstrapFormPage.getExcelData("Product1", "Page2", "2");
  await bootstrapFormPage.populate(data);
  expect(0).toEqual(1);
  await bootstrapFormPage.verify(data);


});
