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
    topRight:  {x: x + 1, y: y - 1},
    bottomRight: {x: x + 1, y: y + 1},
    bottomLeft: {x: x - 1, y: y + 1},
    topLeft: {x: x - 1, y: y - 1}
  };

  for (const cord in coordinates) {
    if(coordinates[cord].x < 0 || coordinates[cord].y < 0 || 
        coordinates[cord].x > arr[0].length -1 || coordinates[cord].y > arr.length -1
    )
    {
        coordinates[cord] = null;
    }
  }

  return coordinates;
}

let count = 0;

for (let y = 0; y < arr.length; y++) {
  for (let x = 0; x < arr[0].length; x++) {
    const {topRight, bottomRight, bottomLeft, topLeft } = {...coordinates(x, y, arr)};

    if(!topRight || !bottomRight || !bottomLeft || !topLeft)
    {
        continue;
    }
    
    let firstDiagonal = arr[topLeft.y][topLeft.x] + arr[y][x] + arr[bottomRight.y][bottomRight.x]
    let secondDiagonal = arr[topRight.y][topRight.x] + arr[y][x] + arr[bottomLeft.y][bottomLeft.x]
    if((firstDiagonal === "SAM" || firstDiagonal === "MAS") &&
        (secondDiagonal === "SAM" || secondDiagonal === "MAS")
    )
    {
        count++;
    }
    
  }
}

console.log(count);

//1353 too low