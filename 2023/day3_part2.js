const fs = require('fs');
let input = fs.readFileSync('day3.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;

const schematic = input.split('\n');
const digitRegex = /\d/;
const testDigit = (rowIndex, colIndex) => {
  if (rowIndex < 0 || colIndex < 0 ||
      rowIndex >= schematic.length || colIndex >= schematic[rowIndex].length) {
    return false;
  }
  return digitRegex.test(schematic[rowIndex][colIndex]);
};

const findFullNumber = (rowIndex, colIndex, foundPartNumbers) => {
  if (!testDigit(rowIndex, colIndex)) {
    return 0;
  }
  let start = colIndex;
  let end = colIndex;
  while (start - 1 >= 0 && testDigit(rowIndex, start - 1)) {
    start--;
  }
  while (end + 1 < schematic[rowIndex].length && testDigit(rowIndex, end + 1)) {
    end++;
  }
  const fullNumber = parseInt(schematic[rowIndex].substring(start, end + 1), 10);
  if (foundPartNumbers.indexOf(fullNumber) >= 0) {
    // cl(`SKIPPING: ${fullNumber}`)
    return 0;
  }
  foundPartNumbers.push(fullNumber);
  // cl(fullNumber);
  return fullNumber;
};

let gearTotal = 0;
schematic.forEach((row, rowIndex) => {
  let foundPartNumbers, prevRow, curRow, nextRow;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '*') { // it's not a . or a number
      foundPartNumbers = [];
      prevRow = [];
      findFullNumber(rowIndex - 1, i - 1, prevRow);
      findFullNumber(rowIndex - 1, i, prevRow);
      findFullNumber(rowIndex - 1, i + 1, prevRow);
      curRow = [];
      findFullNumber(rowIndex, i - 1, curRow);
      findFullNumber(rowIndex, i + 1, curRow);
      nextRow = [];
      findFullNumber(rowIndex + 1, i - 1, nextRow);
      findFullNumber(rowIndex + 1, i, nextRow);
      findFullNumber(rowIndex + 1, i + 1, nextRow);
      foundPartNumbers = foundPartNumbers.concat(prevRow, curRow, nextRow);
      if (foundPartNumbers.length === 2) {
        cl(foundPartNumbers[0], foundPartNumbers[1]);
        gearTotal += foundPartNumbers[0] * foundPartNumbers[1];
      }
    }
  }
});

cl(`Part 2 - gearTotal: ${gearTotal}`);
