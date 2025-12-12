const fs = require("fs");
const regex = /^(?:.*@){4,}.*$/;
var values = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);

let count = -1;
let amountOfX = 0;

while (true) {
    count++;
    let changes = false;

    for (let lineIndex = 0; lineIndex < values.length; lineIndex++) {
        let numbers = values[lineIndex].split('');
        let newNumbers = [...numbers];

        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] === '@') {
                const rolled = roll(numbers, i, lineIndex);
                const match = regex.exec(rolled);
                if (!match) {
                    newNumbers[i] = 'X';
                    amountOfX++;
                    changes = true;
                }
            }
        }

        values[lineIndex] = newNumbers.join('');
    }

    if (!changes) break;
}

function safeRow(i) {
    return values[i] ? values[i].split('') : [];
}

function safe(arr, i) {
    return arr[i] !== undefined ? arr[i] : "";
}

function roll(array, index, count) {
    let lineAbove = [];
    let lineBelow = [];

    lineAbove = safeRow(count - 1);
    lineBelow = safeRow(count + 1);
    return (
        safe(lineAbove, index) + safe(lineAbove, index + 1) +
        safe(array, index + 1) + safe(lineBelow, index + 1) +
        safe(lineBelow, index) + safe(lineBelow, index - 1) +
        safe(array, index - 1) + safe(lineAbove, index - 1)
    );
}

console.log(amountOfX);
