const fs = require("fs");

const values = fs
	.readFileSync(__dirname + "/input.txt", "utf8")
	.trim()
	.split(/\r?\n/);

let total = 0;

for (const line of values) {
	const numbers = line.split("").map(Number);
	let max = 0;

	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			const joltage = numbers[i] * 10 + numbers[j];
			if (joltage > max) max = joltage;
		}
	}

	total += max;
}

console.log(total);
