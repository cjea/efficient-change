let bankNotes = [10, 5, 1];

let memo = {};

console.log(computeChange(84, 100));

function memoize(n, config) {
  memo[n] = Object.assign({}, config);
  return memo[n];
}

function computeChange(price, paid) {
  let due = paid - price;
  mostEfficient(due, initNotes(0));
  return memo[0] || "IMPOSSIBLE";
}

function mostEfficient(n, config) {
  if (n < 0) return false;

  if (n === 0) {
    memoize(0, compare(memo[n], config));
    return;
  }

  let notes = Object.keys(config);
  for (let i = 0; i < notes.length; ++i) {
    let note = Number(notes[i]);
    mostEfficient(n - note, addNote(config, note));
  }
}

function initNotes(n) {
  return bankNotes.reduce((acc, cur) => {
    acc[cur] = n;
    return acc;
  }, {});
}

function addNote(config, note) {
  config = Object.assign({}, config);
  config[note] = (config[note] || 0) + 1;
  return config;
}

// return the most efficient of two configs
function compare(a, b) {
  if (!a) return b;
  if (!b) return a;

  return sum(Object.values(a)) < sum(Object.values(b)) ? a : b;
}
function sum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}
