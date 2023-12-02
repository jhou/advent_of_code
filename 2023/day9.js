const fs = require('fs');
let input = fs.readFileSync('day9.txt', {encoding:'utf8', flag:'r'});
// input = `
// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2
// `;
input = input.trim();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const moves = input.split('\n'),
      tailPositions = new Set(['0,0']);
//let knots = Array(2).fill([0,0]);
let knots = Array(10).fill([0,0]);

const moveHead = (dir, headPos) => {
  switch (dir) {
    case 'R':
      return [headPos[0] + 1, headPos[1]];
    case 'L':
      return [headPos[0] - 1, headPos[1]];
    case 'U':
      return [headPos[0], headPos[1] + 1];
    case 'D':
      return [headPos[0], headPos[1] - 1];
    default:
      cl('ERROR - bad direction');
  };
};
const distant = (p1, p2) => {
  return (Math.abs(p1[0] - p2[0]) > 1 || Math.abs(p1[1] - p2[1]) > 1);
};
const moveKnot = (prevKnot, nextKnot) => {
  if (!distant(prevKnot, nextKnot)) return nextKnot;
  const xFn = prevKnot[0] - nextKnot[0] >= 0 ? Math.ceil : Math.floor;
  const yFn = prevKnot[1] - nextKnot[1] >= 0 ? Math.ceil : Math.floor;
  return [
    xFn((nextKnot[0] + prevKnot[0]) / 2),
    yFn((nextKnot[1] + prevKnot[1]) / 2)
  ];
};

moves.forEach(instruction => {
  const dir = instruction.split(' ')[0];
  let numMoves = parseInt(instruction.split(' ')[1]);
  while (numMoves > 0) {
    // cl(`Move: ${dir}`);
    knots[0] = moveHead(dir, knots[0]);
    // cl(`headPos ${headPos.join(',')}`);
    for (let i = 1; i < knots.length; i++) {
      knots[i] = moveKnot(knots[i - 1], knots[i]);
    }
    // cl(`tailPos ${tailPos.join(',')}`);
    tailPositions.add(knots[knots.length - 1].join(','));
    numMoves--;
  }
});

cl(`Total Tail Positions: ${tailPositions.size}`);
cl(tailPositions.entries());
