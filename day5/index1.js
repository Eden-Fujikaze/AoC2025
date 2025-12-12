const fs = require("fs");

const lines = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);

const emptyIndex = lines.indexOf("");

const intervalLines = lines.slice(0, emptyIndex);
const instructions = lines.slice(emptyIndex + 1);

var freshRanges = [];
var counter = 0;

for (const interval of intervalLines) {
    const [startStr, endStr] = interval.split("-");
    freshRanges.push([Number(startStr), Number(endStr)]);
}

for (const instructionStr of instructions) {
    const instruction = Number(instructionStr);

    for (var i = 0; i < freshRanges.length; i++) {
        const [start, end] = freshRanges[i];

        if (instruction >= start && instruction <= end) {
            counter++;
            break;
        }
    }
}

console.log(counter);