const fs = require('fs');
let input = fs.readFileSync('day2.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();


const rounds = input.split('\n');

let plays = [];
rounds.forEach(round => {
  let play = '';
  if (round === 'A X') {
    // rock lose
    play = 'A Z'
  } else if (round === 'A Y') {
    // rock draw
    play = 'A X'
  } else if (round === 'A Z') {
    // rock win
    play = 'A Y'
  } else if (round === 'B X') {
    // paper lose
    play = 'B X'
  } else if (round === 'B Y') {
    // paper draw
    play = 'B Y'
  } else if (round === 'B Z') {
    // paper win
    play = 'B Z'
  } else if (round === 'C X') {
    // scissors lose
    play = 'C Y'
  } else if (round === 'C Y') {
    // scissors draw
    play = 'C Z'
  } else if (round === 'C Z') {
    // scissors win
    play = 'C X'
  }
  plays.push(play);
});

let total = 0;
plays.forEach(play => {
  let points = 0;
  if (play === 'A X') {
    // rock rock
    points = 4 // 1 + 3
  } else if (play === 'A Y') {
    // rock paper
    points = 8 // 2 + 6
  } else if (play === 'A Z') {
    // rock scissors
    points = 3 // 3 + 0
  } else if (play === 'B X') {
    // paper rock
    points = 1 // 1 + 0
  } else if (play === 'B Y') {
    // paper paper
    points = 5 // 2 + 3
  } else if (play === 'B Z') {
    // paper scissors
    points = 9 // 3 + 6
  } else if (play === 'C X') {
    // scissors rock
    points = 7 // 1 + 6
  } else if (play === 'C Y') {
    // scissors paper
    points = 2 // 2 + 0
  } else if (play === 'C Z') {
    // scissors scissors
    points = 6 // 3 + 3
  }
  total += points;
})

console.log(total);
