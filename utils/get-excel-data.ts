import * as XLSX from 'xlsx';
import * as fs from 'fs';

import { Constants } from "./constants";
import { error } from 'console';

/* load 'fs' for readFile and writeFile support */
XLSX.set_fs(fs);

async function getExcelData(sheetName: string, page: string, id: string) {
  const wb = XLSX.readFile(Constants.FILE_DATA_EXCEL, { cellStyles: true });
  const ws = wb.Sheets[sheetName];
  const a1Style = ws['!ref']?.toString();

  if (!a1Style) throw new error("Something is wrong with sheet. Please check...");

  var range = XLSX.utils.decode_range(a1Style);
  const colCount = range.e.c + 1;
  const rowCount = range.e.r + 1;
  const colWithIdMatched = [...Array(colCount).keys()].map(item => XLSX.utils.encode_col(item)).find(col => ws[`${col}1`].v == id);
  const data = {};
  const propCol = "A";
  const pageCol = "B";
  [...Array(rowCount).keys()].forEach(item => {
    const rowNo = item + 1;
    if (ws[`${pageCol}${rowNo}`].v == page) {
      const propName = ws[`${propCol}${rowNo}`].v;
      const propValue = ws[`${colWithIdMatched}${rowNo}`].v;
      data[propName] = propValue;
    }
  });
  console.log(data);
  return data;
}

export default getExcelData;