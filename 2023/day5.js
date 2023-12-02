const fs = require('fs');
let input = fs.readFileSync('day5.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

let [stacksTxt, moves] = input.split('\n\n');

cl(stacksTxt);

const stacksRaw = stacksTxt.split('\n');
const stacks = [];
moves = moves.split('\n');

const setupStacks = () => {
  let lastRow = stacksRaw.pop();
  const numStacks = parseInt(lastRow[lastRow.length-1]);

  for (let i = 0; i < numStacks; i++) {
    stacks.push([]);
  }
  while (stacksRaw.length > 0) {
    lastRow = stacksRaw.pop();

    let offset = 1;
    for (let i = 0; i < numStacks; i++) {
      if ([' ', undefined].indexOf(lastRow[offset]) === -1) {
        stacks[i].push(lastRow[offset]);
      }
      offset += 4;
    }
  }
};

const processMoves = () => {
  moves.forEach(move => {
    let pawn, pawns = [];
    const parsedMove = move.split(' ');
    const moveNum = parseInt(parsedMove[1]);
    const moveFrom = parseInt(parsedMove[3]);
    const moveTo = parseInt(parsedMove[5]);

    for (let i = 0; i < moveNum; i++) {
      pawns.push(stacks[moveFrom - 1].pop());
    }
    for (let i = 0; i < moveNum; i++) {
      stacks[moveTo - 1].push(pawns.pop());
    }
  });
};

setupStacks();
jcl(stacks);
processMoves();
jcl(stacks);

let codes = [];
stacks.forEach(stack => {
  codes.push(stack[stack.length - 1]);
});
cl(codes.join(''));

