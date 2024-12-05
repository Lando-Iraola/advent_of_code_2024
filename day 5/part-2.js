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

const notOkayList = [];
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
  if (!isListOkay) {
    notOkayList.push(list);
  }
}

const orderedList = [];
for (let list of notOkayList) {
  let isListOkay = true;
  
  for(let i = 0; i < 2; i++)
  {
  for (const page of list) {
    
    const leftRules = rules.filter((r) => r[0] === page)
    for (let i = list.indexOf(page) - 1; i > 0; i--) {
      for (const rule of leftRules) {
        if (list[i] === rule[1]) {
          const index = list.indexOf(page);
          const a = list[list.indexOf(page)];
          const b = list[i];
          list[i] = a;
          list[index] = b;
        }
      }
    }

    const rightRules = rules.filter((r) => r[1] === page)
    // console.log(rightRules, page)
    for (let i = list.indexOf(page) + 1; i < list.length - 1; i++) {
      // console.log("durante un solo ciclo derecha", i, rightRules, list[i], page);
      for (const rule of rightRules) {
        if (list[i] === rule[0]) {
          const index = list.indexOf(page);
          const a = list[list.indexOf(page)];
          const b = list[i];
          list[i] = a;
          list[index] = b;
        }
      }
      // console.log("despues del ciclo de la derecha", list);
    }
    
   
  }
  }
  orderedList.push(list);
}

let val = 0;

for (const list of orderedList) {
  val += list[Math.floor(list.length / 2)];
}

console.log(val);
// console.log(orderedList);

//5908 not right
//5919 too high
//5888 too low
//5865 too low
