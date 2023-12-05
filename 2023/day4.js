const fs = require('fs');
let input = fs.readFileSync('day4.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const cl = console.log;
const cards = input.split('\n');

const { intersection } = require('set-operations');
let total = 0;
let cardCount = Array(cards.length).fill(1);

cards.forEach((card, cardIndex) => {
  // get rid of double spaces for single digit numbers, and then separate winners and numbers
  let [winners, numbers] = card.replaceAll(/\s\s/g, ' ').split(': ')[1].split(' | ');
  winners = winners.split(' ');
  numbers = numbers.split(' ');

  let matches = intersection(winners, numbers);
  let numMatches = matches.length;
  if (numMatches > 0) {
    cl(`adding ${Math.pow(2, numMatches - 1)}`);
    total += Math.pow(2, numMatches - 1);

    while (numMatches > 0) {
      cardCount[cardIndex + numMatches] += cardCount[cardIndex];
      numMatches--;
    }
  }
});
cl(`Part 1 - Points Total: ${total}`);
const totalCards = cardCount.reduce((cardTotal, curVal) => cardTotal + curVal, 0)
cl(`Part 2 - Total Cards: ${totalCards}`);
