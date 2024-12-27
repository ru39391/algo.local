import handleDataValues from './src/sprint-1-task-1.js';

// sprint 1, task 1
const values = [
    '98 0 10 77 0 59 28 0 94', // 1 0 1 1 0 1 1 0 1
    '99 0 100 72 43 49 0 51 19 61 93 31', // 1 0 1 2 2 1 0 1 2 3 4 5
    '0 3 41 0 0 0 0 0 49 0 0 56 0 88', // 0 1 1 0 0 0 0 0 1 0 0 1 0 1
    '0 1 4 9 0', // 0 1 2 1 0
    '0 7 9 4 8 20', // 0 1 2 3 4 5
];

values.forEach(str => console.log(handleDataValues(str)));

/*
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];

rl.on('line', (input) => {
  lines.push(input);

  if (lines.length === 2) {
    let res = handleDataValues(lines[1]);
    process.stdout.write(res);
    process.exit();
    rl.close();
  }
});
*/