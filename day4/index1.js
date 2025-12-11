const fs = require("fs");
const regex = /^(?:.*@){4,}.*$/;
const values = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);

let count = -1;
let amountOfX = 0;

for (const line of values) {
    count++;
    const numbers = line.split('');

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === '@') {
            const rolled = roll(numbers, i, count);
            const match = regex.exec(rolled);
            if (!match) {
                amountOfX++;
            }
        }
    }
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

    if (count === 0) {
        lineBelow = safeRow(count + 1);
        return (
            safe(array, index + 1) + safe(lineBelow, index + 1) +
            safe(array, index - 2) + safe(lineBelow, index - 1) +
            safe(lineBelow, index)
        );
    }

    lineAbove = safeRow(count - 1);
    lineBelow = safeRow(count + 1);
    return (
        safe(lineAbove, index) + safe(lineAbove, index + 1) +
        safe(array, index + 1) + safe(lineBelow, index + 1) +
        safe(lineBelow, index) + safe(lineBelow, index - 1) +
        safe(array, index - 2) + safe(lineAbove, index - 1)
    );
}

console.log(amountOfX);