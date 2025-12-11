const fs = require("fs");

const values = fs
	.readFileSync(__dirname + "/input.txt", "utf8")
	.trim()
	.split(/\r?\n/);

var finished = [];

for (const line of values) {
	var digits = line.toString().split('');
	var numbers = digits.map(Number);
	finished.push(findNumber(numbers, 12, ""));
}

function findNumber(array, index, value) {
	let max = -1;
	let maxIndex = 0;
	let need = index;

	array.forEach((element, i) => {

		let remaining = array.length - (i + 1);

		if (remaining + 1 < need) {
			return;
		}

		if (element > max) {
			max = element;
			maxIndex = i;
		}
	});

	array = array.slice(maxIndex + 1);

	if (value.length !== 12) {
		return findNumber(array, index - 1, value + max.toString());
	} else {
		return value;
	}
}


let sum = 0;
for (let i = 0; i < finished.length; i++) {
	sum += parseInt(finished[i]);
}

console.log(sum);

