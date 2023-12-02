const fs = require('fs');


let input = fs.readFileSync('day1.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();


const elves = input.split('\n\n');

// console.log(elves);

let max = 0,
    max1 = 0,
    max2 = 0,
    max3 = 0;

elves.forEach(elf => {
  const calories = elf.split('\n');
  // console.log(calories);
  let calorieTotal = calories.reduce((partial, el) => partial + parseInt(el, 10), 0);
  // console.log(calorieTotal);
  max = Math.max(max, calorieTotal);
  if (calorieTotal > max1) {
    max3 = max2;
    max2 = max1
    max1 = calorieTotal;
  } else if (calorieTotal > max2) {
    max3 = max2;
    max2 = calorieTotal;
  } else if (calorieTotal > max3) {
    max3 = calorieTotal;
  }
});

console.log(max);
console.log(max1);
console.log(max2);
console.log(max3);
console.log(max1+max2+max3);
