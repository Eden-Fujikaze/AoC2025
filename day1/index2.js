const fs = require("fs");

let start = 50;
let counter = 0;

const values = fs
	.readFileSync(__dirname + "/input.txt", "utf8")
	.trim()
	.split(/\r?\n/);

for (const line of values) {
	const dist = parseInt(line.slice(1));

	if (line[0] === "L") {
		for (let i = 0; i < dist; i++) {
			start--;
			if (start < 0) start = 99;
			if (start === 0) counter++;
		}
	} else {
		for (let i = 0; i < dist; i++) {
			start++;
			if (start > 99) start = 0;
			if (start == 0) counter++;
		}
	}
}

console.log(counter);
