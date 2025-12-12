const fs = require("fs");

const lines = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .trim()
    .split(/\r?\n/);
