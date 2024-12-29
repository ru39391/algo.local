import handleDataValues from './src/sprint-1/task-1-1.js';

// sprint 1, task 1
const inputValues = [
    '0',
    '9 8 98 99 0 1 2 789',
    '64 68 37 11 77 80 48 82 0', // 8 7 6 5 4 3 2 1 0
    '99 0 100 72 43 49 0 51 19 61 93 31', // 1 0 1 2 1 2 0 1 2 3 4 5
    '5 8 9 12 15 26 30 0 0 55 0 0 67 0 76 80 82 0 0 98', // 7 6 5 4 3 2 1 0 0 1 0 0 1 0 1 2 1 0 0 1
    '98 0 10 77 0 59 28 0 94', // 1 0 1 1 0 1 1 0 1
    '99 0 100 72 43 49 0 51 19 61 93 31', // 1 0 1 2 2 1 0 1 2 3 4 5
    '0 3 41 0 0 0 0 0 49 0 0 56 0 88', // 0 1 1 0 0 0 0 0 1 0 0 1 0 1
    '0 1 4 9 0', // 0 1 2 1 0
    '0 7 9 4 8 20', // 0 1 2 3 4 5
];
const outputValues = [
    '0',
    '4 3 2 1 0 1 2 3',
    '8 7 6 5 4 3 2 1 0',
    '1 0 1 2 2 1 0 1 2 3 4 5',
    '7 6 5 4 3 2 1 0 0 1 0 0 1 0 1 2 1 0 0 1',
    '1 0 1 1 0 1 1 0 1',
    '1 0 1 2 2 1 0 1 2 3 4 5',
    '0 1 1 0 0 0 0 0 1 0 0 1 0 1',
    '0 1 2 1 0',
    '0 1 2 3 4 5'
];

const joinArray = (arr) => arr.join(' ');

//['5 8 9 12 15 26 30 0 0 55 0 0 67 0 76 80 82 0 0 98']
inputValues.forEach((value, index) => console.log(joinArray(handleDataValues(value)) === outputValues[index], index, joinArray(handleDataValues(value))));//str, `'${handleDataValues(joinArray(arr))}'`

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

///////

const readline = require('readline');

const rl = readline.createInterface({input: process.stdin});

let lines = [];
let str = '';

rl.on('line', (input) => {
  lines.push(input);

  if (lines.length === 2) {
    str = handleDataValues(lines[1].toString().trim().split(' ').map(Number));
  }
});

rl.on('close', () => {
	process.stdout.write(str.join(' '));
});
*/