const fs = require('fs');
let input = fs.readFileSync('day3.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;

const calcPriority = (letter) => {
  const asciiVal = letter.charCodeAt();
  if (asciiVal <= 90) {
    return asciiVal - 38;
  }
  return asciiVal - 96;
}

const sacks = input.split('\n');
let totalPriority = 0;
const groups = [];
let counter = 0;
sacks.forEach(sack => {
  if (counter % 3 === 0) {
    groups.push([sack]);
  } else {
    groups[groups.length - 1].push(sack);
  }
  counter++;
});

groups.forEach(group => {
  for (let i = 0; i < group[0].length; i++) {
    const letter = group[0][i];
    if (group[1].indexOf(letter) !== -1 && group[2].indexOf(letter) !== -1) {
      cl(letter, group);
      totalPriority += calcPriority(letter);
      break;
    }
  }
});


cl(totalPriority);
