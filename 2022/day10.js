const fs = require('fs');
let input = fs.readFileSync('day10.txt', {encoding:'utf8', flag:'r'});
// input = `
// noop
// addx 3
// addx -5
// `;
input = input.trim().split('\n');
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

let instr, val, rowLength = 40, reg = 1, pixels = [];

const calcPixel = (reg, pixels) => {
  return Math.abs(reg - (pixels.length % rowLength)) < 2 ? '#' : '.';
};

for (let i = 0; i < input.length; i++) {
  instr = input[i].split(' ')[0];
  pixels.push(calcPixel(reg, pixels));
  if (instr === 'addx') {
    val = parseInt(input[i].split(' ')[1]);
    pixels.push(calcPixel(reg, pixels));
    reg = reg + val;
  }
}

let pixelString = '';
for (let j = 0; j < pixels.length; j++) {
  if (j % rowLength === 0) {
    pixelString += '\n';
  }
  pixelString += pixels[j];
}
cl(pixelString);
cl('');
