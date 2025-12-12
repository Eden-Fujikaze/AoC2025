const fs = require("fs");
const regex = /^(?:.*@){4,}.*$/;
var values = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);

var amountOfX = 0;

while (true) {
    let removedThisRound = 0;
    let newValues = [...values];

    for (let row = 0; row < values.length; row++) {
        let numbers = values[row].split("");

        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] === "@") {
                const rolled = roll(numbers, i, row);
                if (!regex.test(rolled)) {
                    numbers[i] = "X";
                    amountOfX++;
                    removedThisRound++;
                }
            }
        }

        newValues[row] = numbers.join("");
    }

    values = newValues;

    if (removedThisRound === 0) break;
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