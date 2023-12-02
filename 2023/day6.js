const fs = require('fs');
let input = fs.readFileSync('day6.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const msgSize = 14;
const testPos = (pos) => {
  let testSet = new Set();
  for (let i = 1; i <= msgSize; i++) {
    testSet.add(input[pos - i]);
  }
  return testSet.size === msgSize;
};

for (let i = msgSize; i < input.length; i++) {
  if (testPos(i)) {
    cl(i);
    break;
  }
}
