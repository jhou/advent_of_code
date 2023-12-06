const fs = require('fs');
let input = fs.readFileSync('day6.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const findWays = (times, distances) => {
  let allWaysToWin = [];
  for (let i = 0; i < times.length; i++) {
    let t = times[i],
        d = distances[i]
        curWaysToWin = 0;

    for (let j = 1; j < t - 1; j++) {
      if (j * (t - j) > d) {
        curWaysToWin++;
      }
    }
    allWaysToWin.push(curWaysToWin);
  }
  return allWaysToWin;
}

let [times, distances] =  input.split('\n');
times = times.split(': ')[1].replaceAll(/\s+/g, ' ').trim().split(' ');
distances = distances.split(': ')[1].replaceAll(/\s+/g, ' ').trim().split(' ');
let part1WaysToWin = findWays(times, distances);

cl(`Part 1 - Margin: ${part1WaysToWin.reduce(Math.imul, 1)}`);

let [times2, distances2] =  input.split('\n');
times2 = [BigInt(parseInt(times2.split(': ')[1].replaceAll(/\s+/g, ''), 10))];
distances2 = [BigInt(parseInt(distances2.split(': ')[1].replaceAll(/\s+/g, ''), 10))];
let part2WaysToWin = findWays(times2, distances2);

cl(`Part 2 - ways to win: ${part2WaysToWin[0]}`);
