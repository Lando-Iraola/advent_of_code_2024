const fs = require("node:fs");
const input = fs.readFileSync("./inputs.txt", "utf8");

const rules = [];
let pagesList = [];

for (const line of input.split("\r\n")) {
  if (line.includes("|")) {
    rules.push([...line.split("|").map((v) => parseInt(v))]);
  } else if (line.includes(",")) {
    pagesList.push([...line.split(",").map((v) => parseInt(v))]);
  }
}

const okayList = [];
for (const list of pagesList) {
  let isListOkay = true;
  for (const page of list) {
    const leftRules = rules.filter((r) => r[0] === page);
    
    let leftOkay = true;
    for (let i = list.indexOf(page) - 1; i > 0; i--) {
      for (const rule of leftRules) {
        if (list[i] === rule[1]) {
          leftOkay = false;
        }
      }
    }
    let rightOkay = true;
    const rightRules = rules.filter((r) => r[1] === page);
    
    for (let i = list.indexOf(page) + 1; i < list.length - 1; i++) {
      for (const rule of rightRules) {
        if (list[i] === rule[0]) {
          leftOkay = false;
        }
      }
    }
    if (!leftOkay || !rightOkay) {
      isListOkay = false;
    }
  }
  if (isListOkay) {
    okayList.push(list);
  }
}

let val = 0;

for(const list of okayList)
{
    val += list[Math.floor(list.length / 2)]
}

console.log(val)
console.log(okayList.length)