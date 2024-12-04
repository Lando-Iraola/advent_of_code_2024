const fs = require("node:fs");

let left = [];
let right = [];
let list = fs.readFileSync("./lists.txt", "utf8");

let buffer = "";
let flip = false;
for (let i = 0; i < list.length; i++) {
  if (list[i] === " " || list[i] === "\r" || list[i] === "\n") {
    continue;
  }

  buffer += list[i];
  if (buffer.length === 5) {
    if (!flip) {
      left.push(parseInt(buffer, 10));
    } else {
      right.push(parseInt(buffer, 10));
    }
    buffer = "";
    flip = !flip;
  }
}

left = left.sort();
right = right.sort();

let similarity = 0;
for (let i = 0; i < left.length; i++) {
  let appeareances = 0;
  for (let j = 0; j < right.length; j++) {
    if (left[i] === right[j]) {
      appeareances++;
    }
  }
  similarity += left[i] * appeareances;
}

console.log(similarity);
