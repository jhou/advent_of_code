const fs = require('fs');
let input = fs.readFileSync('day11.txt', {encoding:'utf8', flag:'r'});
// input = ``;
// input = input.trim().split('\n');
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const monkeyText = input.split('\n\n'), monkeys = [];
let commonMultiple = 1;

const makeAdd = num1 => {
  return num2 => num1 + num2;
};
const makeMultiply = num1 => {
  return num2 => num1 * num2;
};
const double = num => num * 2;
const square = num => num * num;
// const square = num => num;

monkeyText.forEach((m) => {
  let lines = m.split('\n');
  lines.shift(); // monkey number
  let items = lines.shift().split(': ')[1].split(', ').map(a => parseInt(a)); // items array
  let opText = lines.shift().split('= ')[1].split(' ');
  let opFunc = opText[1];
  let operand = opText[2];
  let operation;
  if (operand === 'old') {
    operation = square;
  } else if (opFunc === '*') {
    operation = makeMultiply(parseInt(operand));
  } else if (opFunc === '+') {
    operation = makeAdd(parseInt(operand));
  }
  let divideNum = parseInt(lines.shift().split('by ')[1]);
  let trueMonkey = parseInt(lines.shift().split('monkey ')[1]);
  let falseMonkey = parseInt(lines.shift().split('monkey ')[1]);
  let nextMonkey = num => {
    if ((num % divideNum) === 0) {
      return trueMonkey;
    }
    return falseMonkey;
  };

  commonMultiple *= divideNum;
  monkeys.push({
    items,
    operation,
    nextMonkey,
    inspections: 0
  })
});

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    let itemWorry;
    while (itemWorry = monkey.items.shift()) {
      monkey.inspections++;
      itemWorry = monkey.operation(itemWorry);
      // if (itemWorry % 10 === 0) {
      //   itemWorry = Math.floor(itemWorry / 10);
      // }
      // itemWorry = Math.floor(itemWorry / 3);
      itemWorry = itemWorry % commonMultiple;
      monkeys[monkey.nextMonkey(itemWorry)].items.push(itemWorry);
    };
  });
}
cl(monkeys)
let max1 = 0, max2 = 0;
monkeys.forEach((monkey) => {
  if (monkey.inspections > max1) {
    max2 = max1;
    max1 = monkey.inspections;
  } else if (monkey.inspections > max2) {
    max2 = monkey.inspections;
  }
});
cl(max1 * max2);
