const fs = require('fs');
let input = fs.readFileSync('day7.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

// input  = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k
// `;
input = input.split('\n');
const makeNewDir = (name, parent) => {
  return {
    name,
    size: undefined,
    parent,
    children: {}
  };
};

const makeNewFile = (name, parent, size) => {
  return {
    name,
    size,
    parent
  };
};

let cmd;
const fileRegex = /\d+ .*/;
const cdRegex = /\$ cd [a-zA-Z\.]+/;

const calcSize = (dir) => {
  return Object.entries(dir.children).reduce(
    (curSize, entry) => entry[1].size + curSize,
    0
  );
};

let minSol = 41111105;
const root = makeNewDir('/');
let curDir = root;
input.shift(); // cd /
while ((cmd = input.shift()) !== undefined) {
  cmd = cmd.trim();
//  cl(cmd);
  if (cmd === '$ ls') continue;
  if (cmd === '$ cd ..') {
    curDir.size = calcSize(curDir);
    if (curDir.size >= 1111105) {
      minSol = Math.min(minSol, curDir.size);
    }
    curDir = curDir.parent;
    continue;
  };
  if (cmd.startsWith('dir')) {
    let newDirName = cmd.split(' ')[1];
    curDir.children[newDirName] = makeNewDir(newDirName, curDir);
    continue;
  }
  if (fileRegex.test(cmd)) {
    let [newSize, newFileName] = cmd.split(' ');
    curDir.children[newFileName] = makeNewFile(newFileName, curDir, parseInt(newSize));
    continue;
  }
  if (cdRegex.test(cmd)) {
    let splitCmd = cmd.split(' ');
    curDir = curDir.children[splitCmd[splitCmd.length - 1]];
    continue;
  }
};

while (curDir !== undefined) {
  curDir.size = calcSize(curDir);
  if (curDir.size >= 1111105) {
    minSol = Math.min(minSol, curDir.size);
  }
  cl(`${curDir.name}: ${curDir.size}`);
  curDir = curDir.parent;
};

cl(`total size: ${root.size}`);
cl(`Minimum solution: ${minSol}`);
