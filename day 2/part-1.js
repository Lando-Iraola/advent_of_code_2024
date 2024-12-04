const fs = require("node:fs");
let rawlist = fs.readFileSync("./results.txt", "utf8");

let results = [];
let buffArr = [];
let buffer = "";
for (let i = 0; i <= rawlist.length - 1; i++) {
  buffer += rawlist[i];
  if (rawlist[i] === " ") {
    buffArr.push(parseInt(buffer));
    buffer = "";
    continue;
  }
  if (rawlist[i] === "\n" || i === rawlist.length - 1) {
    buffArr.push(parseInt(buffer));
    results.push([...buffArr]);
    buffArr = [];
    buffer = "";
    continue;
  }
}

let safeReport = [];

for (let i = 0; i < results.length; i++) {
  let isSafe = true;
  let isDecreasing = true;
  for (let j = 1; j < results[i].length; j++) {
    if (j === 1 && results[i][j - 1] < results[i][j]) {
      isDecreasing = false;
    }

    let diff = results[i][j] - results[i][j - 1];
    diff = diff < 0 ? diff * -1 : diff;
    if (diff > 3 || diff === 0) {
      isSafe = false;
      break;
    }

    if (isDecreasing) {
      if (results[i][j] > results[i][j - 1]) {
        isSafe = false;
        break;
      }
    } else {
      if (results[i][j] < results[i][j - 1]) {
        isSafe = false;
        break;
      }
    }
  }

  if (isSafe) {
    safeReport.push([...results[i]]);
  }
}

console.log(safeReport.length)

/*
fs.writeFile("./saferesults.txt", JSON.stringify(safeReport,null,4), (err) => {
  if (err) {
    console.log(err);
  }
});
*/