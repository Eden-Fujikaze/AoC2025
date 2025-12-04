const fs = require("fs");
var sum = 0;

const values = fs
	.readFileSync(__dirname + "/input.txt", "utf8")
	.trim()
	.split(/\r?,/);

for (var line of values) {
	line = line.split(/\r?-/);
	let start = parseInt(line[0]);
	let end = parseInt(line[1]);

	for (let i = start; i <= end; i++) {
		let s = i.toString();
		if (s.length % 2 == 0) {
			let half = s.length / 2;
			if (s.slice(0, half) === s.slice(half)) {
				sum += i;
			}
		}
	}
}

console.log(sum);
