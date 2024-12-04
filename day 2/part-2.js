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
let unsafeReport = [];
for (let i = 0; i < results.length; i++) {
  let differences = [];
  let index = 0;

  while (index <= results[i].length - 1) {
    if (isNaN(results[i][index + 1])) {
      index++;
      continue;
    }
    differences.push(results[i][index] - results[i][index + 1]);
    index++;
  }

  let isSafe = true;
  let isDampened = false;
  let dampenedIndex = -1;
  for (let j = 0; j < differences.length; j++) {
    if (differences[j] === 0 || differences[j] < -3 || differences[j] > 3) {
      if (!isDampened) {
        isDampened = true;
        dampenedIndex = j++;
        continue;
      }
      
      isSafe = false;
      break;
    }
  }

  if(i === 13)
    {
        console.log(differences, results[i], dampenedIndex)
    }
  
  if (isSafe) {
    safeReport.push([...results[i]]);
  } else {
    unsafeReport.push([...results[i]]);
  }
}

console.log(safeReport.length, results.length);

fs.writeFile(
  "./saferesults.txt",
  JSON.stringify(safeReport, null, 4),
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

fs.writeFile(
  "./unsaferesults.txt",
  JSON.stringify(unsafeReport, null, 4),
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
