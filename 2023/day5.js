const fs = require('fs');
let input = fs.readFileSync('day5.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

let sections = input.split('\n\n');
// jcl(sections);
const seeds = sections[0].split(': ')[1].split(' ').map(x => parseInt(x, 10));

const isInRanges = n => {
  for (let i = 0; i < seeds.length; i += 2) {
    let start = seeds[i],
        count = seeds[i + 1];

    if (n < start + count && n >= start) {
      return true;
    }
  }
  return false;
};

const maps = [];
// skip the seeds, then creat maps
for (let i = 1; i < sections.length; i++) {
  let newMap = [],
      mapLines = sections[i].split('\n'),
      splitRange,
      newRange,
      source, dest, rangeLen, additive;

  // skip the name of the map
  for (let j = 1; j < mapLines.length; j++) {
    splitRange = mapLines[j].split(' ');
    source = parseInt(splitRange[1]);
    dest = parseInt(splitRange[0]);
    rangeLen = parseInt(splitRange[2]);
    additive = dest - source;
    newRange = {
      source,
      dest,
      rangeLen,
      additive
    };
    newMap.push(newRange);
    // jcl(newRange);
  }
  maps.push(newMap);
};
// maps.map(jcl)

const runTransformations = seed => {
  let range;
  maps.forEach(map => {
    for (let i = 0; i < map.length; i++) {
      range = map[i];
      if (seed >= range.source && seed < (range.source + range.rangeLen)) {
        // cl(`adding ${range.additive} to ${seed}`);
        seed = seed + range.additive;
        break;
      }
    }
  });
  return seed;
}
const reverseTransform = loc => {
  let range;
  maps.toReversed().forEach(map => {
    for (let i = map.length - 1; i >= 0; i--) {
      range = map[i];
      if (loc >= range.dest && loc < (range.dest + range.rangeLen)) {
        loc = loc - range.additive;
        break;
      }
    }
  });
  return loc;
};


let locations = seeds.map(runTransformations);

let minLoc = 0;
while (!isInRanges(reverseTransform(minLoc))) {
  minLoc++;
}

cl(`Part 1 - Minimum Location: ${locations.reduce((a, b) => Math.min(a,b), 1000000000)}`);
cl(`Part 2 - Minimum Location: ${minLoc}`);
