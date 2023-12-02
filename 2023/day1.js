const fs = require('fs');
let input = fs.readFileSync('day1.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const codes = input.split('\n');
let total = 0;

const numberStrs = {
  'oneight': '18',
  'twone': '21',
  'threeight': '38',
  'fiveight': '58',
  'sevenine': '79',
  'eightwo': '82',
  'eighthree': '83',
  'nineight': '98',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};
const numberRegex = /oneight|twone|threeight|fiveight|sevenine|eightwo|eighthree|nineight|one|two|three|four|five|six|seven|eight|nine/g
codes.forEach(code => {
  console.log(code);
  code = code.replaceAll(numberRegex, (numStr) => {
    // replace number strings with the digit string, starting with the damned overlapping numbers
    return numberStrs[numStr];
  });

  // strip out anything that isn't a digit
  code = code.replace(/[a-zA-Z]/g, '');
  const digits = code[0] + code[code.length - 1];
  total += parseInt(digits, 10);
});
console.log(total);

//   const calories = elf.split('\n');
//   // console.log(calories);
//   let calorieTotal = calories.reduce((partial, el) => partial + parseInt(el, 10), 0);
//   // console.log(calorieTotal);
//   max = Math.max(max, calorieTotal);
//   if (calorieTotal > max1) {
//     max3 = max2;
//     max2 = max1
//     max1 = calorieTotal;
//   } else if (calorieTotal > max2) {
//     max3 = max2;
//     max2 = calorieTotal;
//   } else if (calorieTotal > max3) {
//     max3 = calorieTotal;
//   }
// });
