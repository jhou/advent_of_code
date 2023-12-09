const fs = require('fs');
let input = fs.readFileSync('day9.txt', {encoding:'utf8', flag:'r'});
input = input.trim();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const sumArray = (arr) => arr.reduce((tot, item) => tot + item, 0);
const allZeros = arr => arr.reduce((prevZeros, item) => prevZeros && item === 0, true);
const genDiffArray = arr => {
  let diffArray = [];
  for (let i = 1; i < arr.length; i++) {
    diffArray.push(arr[i] - arr[i - 1]);
  }
  return diffArray;
};
const predict = history => {
  if (allZeros(history)) {
    return 0;
  }
  let diffArray = genDiffArray(history);
  let lastEl = history.at(-1),
      recursive = predict(diffArray);
  // cl(`lastEl + recursive: ${lastEl} + ${recursive}`)
  return lastEl + recursive;
};
const extrapolate = history => {
  if (allZeros(history)) {
    return 0;
  }
  let diffArray = genDiffArray(history);
  let firstEl = history.at(0),
      recursive = extrapolate(diffArray);
  // cl(`firstEl - recursive: ${firstEl} - ${recursive}`)
  return firstEl - recursive;
};

const histories = input.split('\n').map(line => line.split(' ').map(x => parseInt(x, 10)));
const sum = histories.reduce((total, history) => total + predict(history), 0);
cl(`Part 1 - : Prediction sum: ${sum}`);
const sum2 = histories.reduce((total, history) => total + extrapolate(history), 0);
cl(`Part 2 - : Extrapolation sum: ${sum2}`);
