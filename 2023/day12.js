const fs = require('fs');
let input = fs.readFileSync('day12.txt', {encoding:'utf8', flag:'r'});
// input = ``;
input = input.trim().split('\n');
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const masterGrid = [],
      startPoints = [],
      xLength = input[0].length,
      yLength = input.length;
let endX = -1,
    endY = -1;

for (let x = 0; x < xLength; x++) {
  masterGrid.push([]);
  for (let y = 0; y < yLength; y++) {
    // point struct
    let newPoint = {
      height: input[y][x].charCodeAt() - 97,
      distance: -1,
      visited: false,
      x,
      y
    };
    if (input[y][x] === 'a') {
      startPoints.push(newPoint);
    }
    if (input[y][x] === 'S') {
      startPoints.push(newPoint);
      newPoint.height = 0;
    }
    if (input[y][x] === 'E') {
      endX = x;
      endY = y;
      newPoint.height = 'z'.charCodeAt() - 97;
    }
    masterGrid[x].push(newPoint);
  }
}

const testAndAddPoint = (newPt, pt, tree) => {
  if (!newPt) return;
  if (!newPt.visited && newPt.height <= pt.height + 1) {
    tree.push(newPt);
    newPt.visited = true
    newPt.distance = pt.distance + 1;
  }
};

let shortestPath = 1000;
startPoints.forEach(startPoint => {
  let grid = JSON.parse(JSON.stringify(masterGrid));
  let tree = [grid[startPoint.x][startPoint.y]];
  tree[0].distance = 0;
  tree[0].visited = true;
  while (tree.length > 0) {
    let newPt,
        pt = tree.shift();

    // left
    newPt = null;
    if (pt.x - 1 >= 0) {
      newPt = grid[pt.x - 1][pt.y];
    }
    testAndAddPoint(newPt, pt, tree);
    // right
    newPt = null;
    if (pt.x + 1 < xLength) {
      newPt = grid[pt.x + 1][pt.y];
    }
    testAndAddPoint(newPt, pt, tree);
    // down
    newPt = null;
    if (pt.y - 1 >= 0) {
      newPt = grid[pt.x][pt.y - 1];
    }
    testAndAddPoint(newPt, pt, tree);
    // up
    newPt = null;
    if (pt.y + 1 < yLength) {
      newPt = grid[pt.x][pt.y + 1];
    }
    testAndAddPoint(newPt, pt, tree);

  };

  if (-1 < grid[endX][endY].distance && grid[endX][endY].distance< shortestPath) {
    shortestPath = grid[endX][endY].distance;
    cl(shortestPath)
  }
});

cl(`shortestPath: ${shortestPath}`)
