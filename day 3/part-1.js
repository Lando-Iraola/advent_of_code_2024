const fs = require("node:fs");
let rawlist = fs.readFileSync("./input.txt", "utf8");

let inps = [];
let opening = "";
let filling = true;
let buffer = "";

for (let i = 0; i <= rawlist.length - 1; i++) {
  opening += rawlist[i];
  if (opening.endsWith("mul(") && !filling) {
    filling = true;
  }

  if (filling) {
    if (
      isNaN(parseInt(rawlist[i])) &&
      rawlist[i] !== ")" &&
      rawlist[i] !== "(" &&
      rawlist[i] !== ","
    ) {
      
      buffer = "";
      filling = false;
      opening = "";
      continue;
    }
    if(rawlist[i] === "(")
    {
      continue
    }

    if (rawlist[i] === ")") {
      
      filling = false;
      if (
        (buffer.split(",").length > 2 ||
          buffer.split(",").length < 2 ||
          buffer.length === 0 ||
          buffer.endsWith("mul(")) &&
        !buffer.startsWith("mul(")
      ) {
        console.log("buff ignr", buffer);
        buffer = "";
        continue;
      }

      inps.push([...buffer.split(","), buffer]);
      buffer = "";
      filling = false;
      opening = "";
      continue;
    }
    buffer += rawlist[i];
  }
}

let total = 0;
for (const pair of inps) {
  total += parseInt(pair[0]) * parseInt(pair[1]);
}
console.log("total", total, inps.length);
fs.writeFile("./resparse.txt", JSON.stringify(inps, null, 2), (err) => {
  if (err) {
    console.log(err);
  }
});
