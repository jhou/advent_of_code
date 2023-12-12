const fs = require('fs');
let input = fs.readFileSync('day11.txt', {encoding:'utf8', flag:'r'});
// input = ``;
input = input.trim();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const isAllDots = (input) => {
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== '.') {
      return false;
    }
  }
  return true;
};

const getColumn = (idx, grid) => {
  let column = [];
  grid.map(row => column.push(row[idx]));
  return column;
};

const calcDistance = (pt1, pt2) => {
  return Math.abs(pt2[0] - pt1[0]) + Math.abs(pt2[1] - pt1[1]);
};

const makeGalaxies = (grid, factor) => {
  let rowIndex = 0,
      colIndex = 0,
      galaxies = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') {
        galaxies.push([rowIndex, colIndex]);
      }
      colIndex += isAllDots(getColumn(j, grid)) ? factor : 1;
    }
    colIndex = 0;
    rowIndex += isAllDots(grid[i]) ? factor : 1;
  }
  return galaxies;
};


const calcTotal = (galaxy) => {
  let pathTotal = 0;
  for (let i = 0; i < galaxy.length - 1; i++) {
    for (let j = i + 1; j < galaxy.length; j++) {
      pathTotal += calcDistance(galaxy[i], galaxy[j]);
    }
  }
  return pathTotal;
};

let grid = input.split('\n').map(x => x.split(''));

let galaxies = makeGalaxies(grid, 2);
let galaxies2 = makeGalaxies(grid, 1000000);

cl(`Part 1 - path total: ${calcTotal(galaxies)}`);
cl(`Part 2 - path total: ${calcTotal(galaxies2)}`);
