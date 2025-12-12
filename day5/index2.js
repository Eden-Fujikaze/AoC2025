const fs = require("fs");

const lines = fs.readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);

const freshRangeLines = [];
for (const line of lines) {
    if (line.trim() === "") break;
    freshRangeLines.push(line);
}

const freshRanges = freshRangeLines.map(line => {
    const [start, end] = line.split("-").map(x => BigInt(x.trim()));
    return [start, end ?? start];
});

freshRanges.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

const mergedRanges = [];

for (const [start, end] of freshRanges) {
    if (mergedRanges.length === 0) {
        mergedRanges.push([start, end]);
    } else {
        const last = mergedRanges[mergedRanges.length - 1];
        if (start <= last[1] + 1n) {
            last[1] = last[1] > end ? last[1] : end;
        } else {
            mergedRanges.push([start, end]);
        }
    }
}

const total = mergedRanges.reduce((sum, [start, end]) =>
    sum + (end - start + 1n), 0n
);

console.log(total.toString());
