const fs = require('fs');
let input = fs.readFileSync('day8.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

// input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

let [instructions, nodeLines] = input.split('\n\n');
const lineRegex = /(\w{3}) = \((\w{3}), (\w{3})\)/

const parseNode = line => {
  const match = lineRegex.exec(line);
  const nodeName = match[1],
  nodeLeft = match[2],
  nodeRight = match[3];
  nodes[nodeName] = {
    L: nodeLeft,
    R: nodeRight
  };
  if (nodeName.charAt(2) === 'A') {
    aNodes.push(nodeName);
  }
  if (nodeName.charAt(2) === 'Z') {
    zNodes.push(nodeName);
  }
  if (nodeLeft === nodeRight) {
    cl(`redundant node ${nodeName}, ${nodeLeft}, ${nodeRight}`)
  }
};

let allNodesHaveZ = (curNodes) => {
  for (let i = 0; i < curNodes.length; i++) {
    if (curNodes[i].charAt(2) !== 'Z') {
      return false;
    }
  }
  return true;
};

let nodes = {},
    aNodes = [],
    zNodes = [];

nodeLines.split('\n').forEach(parseNode);

let curNode = 'AAA';
let counter = 0;
// while (curNode !== 'ZZZ') {
//   const instr = instructions.charAt(counter % (instructions.length));
//   curNode = nodes[curNode][instr];
//   counter++;
// }
cl(`Part 1 - Number of steps: ${counter}`);


const countNodes = (curNodes) => {
  let counter = BigInt(0);
  while (!allNodesHaveZ(curNodes)) {
    const instr = instructions.charAt(Number(counter % BigInt(instructions.length)));
    curNodes = curNodes.map(n => nodes[n][instr]);
    counter++;
    // if (counter > 10000000) {
    //   throw new Error('Too many steps')
    // }
  }
  cl(counter)
  return counter;
};
let nodeCountProduct = aNodes.reduce((total, node) => (total * countNodes([node])), BigInt(1));

cl(`Part 2 - Number of steps: ${counter}`);
