const fs = require('fs');
let input = fs.readFileSync('day13.txt', {encoding:'utf8', flag:'r'});
// input = `
// [1]
// []

// [[]]
// [[[]]]

// [2]
// [1]

// [1]
// [[2]]

// [1,1]
// [1,2]`;
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const rightOrder = (left, right) => {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    return left < right ? 1 : left > right ? -1 : 0;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      if (i >= left.length) {
        return 1;
      }
      if (i >= right.length) {
        return -1;
      }
      let result = rightOrder(left[i], right[i]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }
  if (!Array.isArray(left) && Array.isArray(right)) {
     return rightOrder([left], right);
  }
  if (Array.isArray(left) && !Array.isArray(right)) {
     return rightOrder(left, [right]);
  }
};

const pairTxtArray = input.trim().split('\n\n');
let pairs = pairTxtArray.map((txt) => {
  return txt.split('\n').map(JSON.parse);
});

let total = 0;
pairs.forEach((pair, idx) => {
  const [left, right] = pair;
  const result = rightOrder(left, right);
  if (result === 1) {
    total += idx + 1;
    cl(`Pair ${idx + 1}: Correct order, total: ${total}`);
  }
});

let packets = pairs.flat();
const sortedPackets = packets.sort(rightOrder).reverse();

let index1 = -1,
    index2 = -1;

sortedPackets.forEach((packet, idx) => {
  if (packet.length === 1 && Array.isArray(packet[0]) && packet[0].length === 1 && packet[0][0] === 2) {
    index1 = idx + 1;
    cl(packet, index1);
  }
  if (packet.length === 1 && Array.isArray(packet[0]) && packet[0].length === 1 && packet[0][0] === 6) {
    index2 = idx + 1;
    cl(packet, index2);
  }
});

cl(`index1 * index2 = ${index1 * index2}`);
