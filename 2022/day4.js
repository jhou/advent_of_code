const fs = require('fs');
let input = fs.readFileSync('day4.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;
//input = "5-6,6-41"
const pairs = input.split('\n');
let total = 0;
pairs.forEach(pair => {
  let [elf1, elf2] = pair.split(',');
  elf1 = elf1.split('-').map(digit=>parseInt(digit, 10));
  elf2 = elf2.split('-').map(digit=>parseInt(digit, 10));
  if (!(elf1[0] > elf2[1] || elf1[1] < elf2[0])) {
    cl(elf1, elf2);
    total++;
  }
});
cl(total);
