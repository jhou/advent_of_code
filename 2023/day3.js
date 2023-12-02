const fs = require('fs');
let input = fs.readFileSync('day3.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;

const calcPriority = (letter) => {
  const asciiVal = letter.charCodeAt();
  if (asciiVal <= 90) {
    return asciiVal - 38;
  }
  return asciiVal - 96;
}

const sacks = input.split('\n');
let totalPriority = 0;
sacks.forEach(sack => {
  if (sack.length % 2 !== 0) {
    cl(`${sack} is not of even length ${sack.length}`);
  }
  const compartment1 = sack.substr(0, sack.length/2);
  const compartment2 = sack.substr(sack.length/2)

  for ( let i = 0; i < compartment1.length; i++ ) {
    if (compartment2.indexOf(compartment1[i]) !== -1 ) {
      cl(compartment1[i], calcPriority(compartment1[i]));
      totalPriority += calcPriority(compartment1[i]);
      break;
    }
  }
});


cl(totalPriority);
