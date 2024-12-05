const fs = require("node:fs");
const wordSearch = fs.readFileSync("./inputs.txt", "utf8");

const arr = [];
let buffArr = [];

for (let i = 0; i < wordSearch.length; i++) {
  if (wordSearch[i] === "\r" || wordSearch[i] === "\n" || i === wordSearch.length - 1) {
    if (buffArr.length === 0) {
      continue;
    }
    if(i === wordSearch.length - 1)
    {
        buffArr.push(wordSearch[i])
    }
    arr.push([...buffArr]);
    buffArr = [];
    continue;
  }
  buffArr.push(wordSearch[i]);
}

function coordinates(x, y, arr) {
  const puzzleLength = arr[0].length - 1;
  const puzzleHeigth = arr.length - 1;

  const coordinates = {
    top: [
      [x, y - 1],
      [x, y - 2],
      [x, y - 3],
    ],
    topRight: [
      [x + 1, y - 1],
      [x + 2, y - 2],
      [x + 3, y - 3],
    ],
    right: [
      [x + 1, y],
      [x + 2, y],
      [x + 3, y],
    ],
    bottomRight: [
      [x + 1, y + 1],
      [x + 2, y + 2],
      [x + 3, y + 3],
    ],
    bottom: [
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
    ],
    bottomLeft: [
      [x - 1, y - 1],
      [x - 2, y - 2],
      [x - 3, y - 3],
    ],
    left: [
      [x - 1, y],
      [x - 2, y],
      [x - 3, y],
    ],
    topLeft: [
      [x - 1, y - 1],
      [x - 2, y - 2],
      [x - 3, y - 3],
    ],
  };

  for (const cord in coordinates) {
    for (let i = 0; i < 3; i++) {
      if (coordinates[cord][i][0] < 0 || coordinates[cord][i][1] < 0) {
        coordinates[cord] = [];
        break;
      }

      if (
        coordinates[cord][i][0] > arr.length[0] - 1 ||
        coordinates[cord][i][1] > arr.length - 1
      ) {
        coordinates[cord] = [];
        break;
      }
    }
  }

  return coordinates;
}

const seen = {};

let count = 0;

for (let y = 0; y < arr.length; y++) {
  for (let x = 0; x < arr[0].length; x++) {
    const cords = coordinates(x, y, arr);

    for (const place in cords) {
      let word = arr[y][x];

      if (cords[place].length > 0) {
        for (const c of cords[place]) {
          const [px, py] = [...c];
          word += arr[py][px];
        }
      }

      let keyForReverse = [[...cords[place].reverse(), [x, y]]];
      keyForReverse = keyForReverse.splice(0, 1);
      keyForReverse = keyForReverse.reverse();

      let keyForNormal = [[[x, y], ...cords[place].reverse()]];

      if (word === "XMAS" && !seen[keyForNormal]) {
        seen[keyForNormal] = true;
        count++;
      } else if (word === "SAMX" && !seen[keyForReverse]) {
        seen[keyForReverse] = true;

        count++;
      }
    }
  }
}

console.log(count);

//1295 too low ?!
//154560 too high!
//4530 too high!
// 2912 not right either!