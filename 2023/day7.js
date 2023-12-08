const fs = require('fs');
let input = fs.readFileSync('day7.txt', {encoding:'utf8', flag:'r'});
input = input.trimEnd();
const jcl = (sss) => console.log(JSON.stringify(sss));
const cl = console.log;

const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const valuesJs = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const compareHands = (a, b, part = 1) => {
  let aCards = a[0],
      bCards = b[0],
      aType = findType(aCards, part),
      bType = findType(bCards, part);

  if (aType !== bType) {
    return aType - bType;
  }
  // they're same type
  return compareValues(aCards, bCards, part);
};

const processJs = (buckets) => {
  let jPosition = Object.keys(buckets).indexOf('J');
  if (jPosition > -1) {
    let numJs = buckets['J'];
    delete buckets['J'];
    let maxCard, maxCardValue = 0;
    for (const card in buckets) {
      if (maxCardValue === undefined || maxCardValue < buckets[card]) {
        maxCard = card;
        maxCardValue = buckets[card];
      }
    }
    buckets[maxCard] += numJs;
  }
};

const findType = (cards, part) => {
  let buckets = {};
  for (let i = 0; i < cards.length; i++) {
    if (buckets[cards[i]] === undefined) {
      buckets[cards[i]] = 1;
    } else {
      buckets[cards[i]]++;
    }
  }
  if (part === 2) {
    processJs(buckets);
  }
  const numBuckets = Object.keys(buckets).length;
  if (numBuckets === 1) {
    return 7; // 5 of a kind
  }
  if (numBuckets === 2) {
    if (Object.values(buckets).indexOf(4) > -1) {
      return 6; // 3 of a kind
    }
    return 5; // must have been full house
  }
  if (numBuckets === 3) {
    if (Object.values(buckets).indexOf(3) > -1) {
      return 4; // 3 of a kind
    }
    return 3; // must have been 2 pairs
  }
  if (numBuckets === 4) {
    return 2; // one pair, the rest are different
  }
  if (numBuckets === 5) {
    return 1; // all different cards
  }
  throw new Error('Invalid cards');
};

const compareValues = (aCards, bCards, part) => {
  let valueArray = part === 1 ? values : valuesJs;
  for (let i = 0; i < 5; i++) {
    if (aCards.charAt(i) !== bCards.charAt(i)) {
      return valueArray.indexOf(aCards.charAt(i)) - valueArray.indexOf(bCards.charAt(i));
    }
  }
  // must be the same values
  return 0;
};

let hands = input.split('\n');
let handsJs = input.split('\n');
// hand[0] is the cards, and hands[1] is the bid
hands = hands.map((hand) => hand.split(' '));
handsJs = handsJs.map((hand) => hand.split(' '));

// do the magic
hands.sort(compareHands);
// do the magic _again_
handsJs.sort((a, b) => compareHands(a, b, 2));

const countWinnings = (acc, hand, idx) => {
  const bid = hand[1];
  return acc + ((idx + 1) * bid);
};
// count the winnings
let totalWinnings = hands.reduce(countWinnings, 0);
let totalWinningsJs = handsJs.reduce(countWinnings, 0);


cl(`Part 1 - Total Winnings: ${totalWinnings}`);
cl(`Part 2 - Total Winnings: ${totalWinningsJs}`);
