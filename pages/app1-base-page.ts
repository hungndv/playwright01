import { type Page } from '@playwright/test';
import { BasePage } from './base-page';

import * as XLSX from 'xlsx';
import * as fs from 'fs';

import { error } from 'console';
import { Constants } from '../utils/constants';
import loggedMethod from '../utils/logged-method';

/* load 'fs' for readFile and writeFile support */
XLSX.set_fs(fs);

export class App1BasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  @loggedMethod
  async getExcelData(sheetName: string, page: string, id: string): Promise<Object[]> {
    const wb = XLSX.readFile(Constants.FILE_DATA_EXCEL, { cellStyles: true });

    // recalc the workbook
    // const XLSX_CALC = require('xlsx-calc');
    // const formulajs = require('@formulajs/formulajs');
    // XLSX_CALC.import_functions(formulajs);
    // XLSX_CALC(wb);

    // await new Promise(resolve => setTimeout(resolve, 5000));

    const ws = wb.Sheets[sheetName];
    const a1Style = ws['!ref']?.toString();

    if (!a1Style) throw new error("Something is wrong with sheet. Please check...");

    var range = XLSX.utils.decode_range(a1Style);
    const colCount = range.e.c + 1;
    const rowCount = range.e.r + 1;
    const colWithIdMatched = [...Array(colCount).keys()].map(item => XLSX.utils.encode_col(item)).find(col => ws[`${col}1`].v == id);
    const data: object[] = [];
    const propCol = "A";
    const pageCol = "B";
    [...Array(rowCount).keys()].forEach(item => {
      const rowNo = item + 1;
      if (ws[`${pageCol}${rowNo}`].v == page) {
        const propName = ws[`${propCol}${rowNo}`].v;
        const propValue = ws[`${colWithIdMatched}${rowNo}`].v;
        const obj = {};
        obj[propName] = propValue;
        data.push(obj);
      }
    });
    console.log(data);
    return data;
  }
}