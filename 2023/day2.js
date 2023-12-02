const fs = require('fs');
let input = fs.readFileSync('day2.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();


const games = input.split('\n');
const limits = {
  'red': 12,
  'green': 13,
  'blue': 14
};

let idSum = 0;
let powerSum = 0;
for (let i = 0; i < games.length; i++) {
  const game = games[i].split(': ')[1];
  const sets = game.split('; ');
  let possible = true;
  const minSet = {
    'red': 0,
    'green': 0,
    'blue': 0
  };
  sets.forEach(set => {
    // console.log(set);
    const cubes = set.split(', ');
    cubes.forEach(cube => {
      let [num, color] = cube.split(' ');
      num = parseInt(num, 10);
      if (limits[color] < num) {
        // console.log(`Failure ---- num: ${num}, color: ${color}, limits[color]: ${limits[color]}`);
        possible = false  ;
      }
      minSet[color] = Math.max(minSet[color], num);
    });
  });
  if (possible) {
    // console.log(`Game ${i + 1} is possible`)
    idSum += (i + 1);
  }
  powerSum += minSet['blue'] * minSet['green'] * minSet['red'];
}

console.log(`Part 1: idSum: ${idSum}`);
console.log(`Part 2: powerSum: ${powerSum}`);
