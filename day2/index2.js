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

		if ((s + s).slice(1, -1).includes(s)) {
			sum += parseInt(s);
		}
	}
}

console.log(sum);
