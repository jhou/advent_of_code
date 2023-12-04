const fs = require('fs');
let input = fs.readFileSync('day3.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;

const schematic = input.split('\n');
const digitRegex = /\d/;
const notDigitRegex = /[^\d\.]/;
const testDigitAt = (rowIndex, colIndex) => {
  if (rowIndex < 0 || colIndex < 0 ||
      rowIndex >= schematic.length || colIndex >= schematic[rowIndex].length) {
    return false;
  }
  return digitRegex.test(schematic[rowIndex][colIndex]);
};
const testSymbolAt = (rowIndex, colIndex) => {
  return notDigitRegex.test(schematic[rowIndex][colIndex]);
};

// given a row and a column index (assumed to be a digit), find all the digits subsequent.
const findFullNumber = (rowIndex, colIndex) => {
  let start = colIndex;
  let end = colIndex;
  while (end + 1 < schematic[rowIndex].length && testDigitAt(rowIndex, end + 1)) {
    end++;
  }
  const fullNumber = schematic[rowIndex].substring(start, end + 1);
  cl(fullNumber);
  return fullNumber;
};

const findSymbolAround = (rowIndex, colIndex) => {
  if (rowIndex >= 1) {
    // look for a symbol in the row BEFORE this row
    if (colIndex >= 1) {
      if (testSymbolAt(rowIndex - 1, colIndex - 1)) {
        return true;
      }
    }
    if (testSymbolAt(rowIndex - 1, colIndex)) {
      return true;
    }
    if (colIndex < schematic[rowIndex].length - 1) {
      if (testSymbolAt(rowIndex - 1, colIndex + 1)) {
        return true;
      }
    }
  }
  // look for a symbol in THIS row (left and right)
  if (colIndex >= 1) {
    if (testSymbolAt(rowIndex, colIndex - 1)) {
      return true;
    }
  }
  if (colIndex < schematic[rowIndex].length - 1) {
    if (testSymbolAt(rowIndex, colIndex + 1)) {
      return true;
    }
  }
  if (rowIndex < schematic.length - 1) {
    // look for a symbol in the row AFTER this row
    if (colIndex >= 1) {
      if (testSymbolAt(rowIndex + 1, colIndex - 1)) {
        return true;
      }
    }
    if (testSymbolAt(rowIndex + 1, colIndex)) {
      return true;
    }
    if (colIndex < schematic[rowIndex].length - 1) {
      if (testSymbolAt(rowIndex + 1, colIndex + 1)) {
        return true;
      }
    }
  }
  return false;
};

let partsTotal = 0;
schematic.forEach((row, rowIndex) => {
  let curNumber, foundSymbol;
  for (let i = 0; i < row.length; i++) {
    if (testDigitAt(rowIndex, i)) { // it's a number
      foundSymbol = false;
      curNumber = findFullNumber(rowIndex, i);
      for (let j = 0; j < curNumber.length; j++) {
        if (findSymbolAround(rowIndex, i + j)) {
          foundSymbol = true;
        }
      }
      if (foundSymbol) {
        partsTotal += parseInt(curNumber, 10);
      }
      i += curNumber.length;
    }
  }
});

cl(`Part 1 - partsTotal: ${partsTotal}`);
