const fs = require('fs');
let input = fs.readFileSync('day12.txt', {encoding:'utf8', flag:'r'});
// input = ``;
input = input.trim().split('\n');
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const grid = []
      startX = -1,
      startY = -1,
      endX = -1,
      endY = -1
      xLength = input[0].length,
      yLength = input.length;

for (let y = 0; y < yLength; y++) {
  grid.push([]);
  for (let x = 0; x < xLength; x++) {
    grid[y].push({
      height: input[yLength - y - 1][x],
      distance: Infinity,
      visited: false
    })
    if (gridLine[i] === 'S') {
      startX = i;
      startY = lineNumber;
      newLine[i].distance = 0;
    }
    if (gridLine[i] === 'E') {
      endX = i;
      endY = lineNumber;
    }
  }
}

let lineNumber = 0;
while (gridLine = input.pop()) {
  const newLine = [];
  for (let i = 0; i < gridLine.length; i++) {
    newLine.push();

  }
  lineNumber++;
}

cl(grid);

let tree = [[startX, startY]];

while (tree.length > 0) {
  let curPoint = tree.shift();
  let curDistance = grid[curPoint[0], curPoint[1]].distance;
  let curHeight = grid[curPoint[0], curPoint[1]].height;
  // left
  if (curPoint[1] - 1 >= 0) {
    if (!grid[curPoint[0] - 1 , curPoint[1]].visited && grid[curPoint[0], curPoint[1] - 1].height <= curHeight + 1) {
      tree.push([curPoint[0] - 1 , curPoint[1]``]);
    }
  }
  // right
  if (curPoint[1] + 1 <= maxX) {
    if (!grid[curPoint[0], curPoint[1] - 1].visited && grid[curPoint[0], curPoint[1] - 1].height <= curHeight + 1) {
      tree.push([curPoint[0], curPoint[1] - 1]);
    }
  }
};


