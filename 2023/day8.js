const fs = require('fs');
let input = fs.readFileSync('day8.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

// input = `30373
// 25512
// 65332
// 33549
// 35390`;

const rows = input.split('\n');
const numRows = rows.length;
const numCols = rows[0].length;
const visible = [];
const scores = [];
rows.forEach((row) => {
  let newArray = Array(row.length).fill(0);
  visible.push(newArray);
  newArray = Array(row.length).fill(1);
  scores.push(newArray);
});
let i, j,
    curHeight, curMax = -1,
    curScore = 0, prevHeights = [];

const calcScore = () => {
  let newScore = 0;
  for (let k = 0; k < prevHeights.length; k++) {
    newScore++;
    if (prevHeights[k] >= curHeight) {
      break;
    }
  }
  prevHeights.unshift(curHeight);
  return newScore;
};

jcl(rows);

// going up the rows
for (i = 0; i < numRows; i++) {
  for (j = 0; j < numCols; j++) {
    curHeight = parseInt(rows[i][j]);
    // visibility
    if (curHeight > curMax) {
      visible[i][j] = 1;
      curMax = curHeight;
    }
    // score
    scores[i][j] = scores[i][j] * calcScore();
  }
  curMax = -1;
  curScore = 0;
  prevHeights = [];
}
// cl('visible')
// jcl(visible);
// cl('scores')
// jcl(scores);

// going down the rows
for (i = 0; i < numRows; i++) {
  for (j = numCols-1; j >= 0 ; j--) {
    curHeight = parseInt(rows[i][j]);
    if (curHeight > curMax) {
      visible[i][j] = 1;
      curMax = curHeight;
    }
    // score
    scores[i][j] = scores[i][j] * calcScore();
  }
  curMax = -1;
  curScore = 0;
  prevHeights = [];
}
// cl('visible')
// jcl(visible);
// cl('scores')
// jcl(scores);


// going down the columns
for (i = 0; i < numCols; i++) {
  for (j = 0; j < numRows; j++) {
    curHeight = parseInt(rows[j][i]);
    if (curHeight > curMax) {
      visible[j][i] = 1;
      curMax = curHeight;
    }
    // score
    scores[j][i] = scores[j][i] * calcScore();
  }
  curMax = -1;
  curScore = 0;
  prevHeights = [];
}
// cl('visible')
// jcl(visible);
// cl('scores')
// jcl(scores);


// going up the columns
for (i = 0; i < numCols; i++) {
  for (j = numRows - 1; j >= 0; j--) {
    curHeight = parseInt(rows[j][i]);
    if (curHeight > curMax) {
      visible[j][i] = 1;
      curMax = curHeight;
    }
    // score
    scores[j][i] = scores[j][i] * calcScore();
  }
  curMax = -1;
  curScore = 0;
  prevHeights = [];
}
cl('visible')
jcl(visible);
cl('scores')
jcl(scores);


const totalVisible = visible.flat().reduce((sum, cur) => sum + cur, 0);
const maxScore = scores.flat().reduce((maximum, cur) => Math.max(maximum, cur), 0);
cl(`totalVisible: ${totalVisible}`);
cl(`maxScore: ${maxScore}`);
