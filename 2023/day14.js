const fs = require('fs');
let input = fs.readFileSync('day14.txt', {encoding:'utf8', flag:'r'});
// input = ``;
input = input.trim();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const paths = input.split('\n').map(pathTxt => {
  const points = pathTxt.split(' -> ');
  return points.map(
    pointTxt => pointTxt.split(',').map(
      point => parseInt(point, 10)
    )
  );
});

jcl(paths)

const addPoints = (pt1, pt2) => {
  return [
    pt1[0] + pt2[0],
    pt1[1] + pt2[1]
  ];
};

const pointsEqual = (pt1, pt2) => pt1[0] === pt2[0] && pt1[1] === pt2[1];

const clGrid = () => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === undefined) {
      continue;
    }
    let curLine = '';
    for (let j = 0; j < grid[i].length; j++) {
      curLine += grid[i][j] || '.';
    }
    cl(curLine);
  }
};

const grid = [];
const markStone = (point) => {
  if (!grid[point[0]]) {
    grid[point[0]] = [];
  }
  grid[point[0]][point[1]] = '#';
};

paths.forEach(path => {
  let prevPoint;
  path.forEach(point => {
    if (prevPoint) {
      let increment, curPoint = prevPoint;
      const [x, y] = point;
      const [prevX, prevY] = prevPoint;
      const incX = (x - prevX) !== 0 ? (x - prevX) / Math.abs(x - prevX) : 0;
      const incY = (y - prevY) !== 0 ? (y - prevY) / Math.abs(y - prevY) : 0;
      increment = [incX, incY];
      while (!pointsEqual(curPoint, point)) {
        markStone(curPoint);
        curPoint = addPoints(curPoint, increment);
      }
    }
    prevPoint = point;
  });
});
clGrid();
jcl(grid);

