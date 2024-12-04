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

let differences = 0;
for(let i = 0; i < left.length; i++)
{
  if(left[i] < right[i])
  {
    differences += right[i] - left[i];
  }
  else
  {
    differences += left[i] - right[i];
  }
}

console.log(differences);