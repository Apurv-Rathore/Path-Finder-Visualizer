// recursiveDivision

let walls;
function recursiveDivision(
  grid,
  START_ROW,
  START_COL,
  END_ROW,
  END_COL,
  NUMBER_OF_ROW,
  NUMBER_OF_COL
) {
  let vertical = [];
  let horizontal = [];

  for (let row = 1; row < grid.length; row++) horizontal.push(row);
  for (let col = 1; col < grid[0].length; col++) vertical.push(col);
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    if (row==START_ROW && (0==START_COL || START_COL==NUMBER_OF_COL-1)) continue;
    if (row==END_ROW && (0==END_COL || END_COL==NUMBER_OF_COL-1)) continue;
    grid[row][0].isWall = true;
    grid[row][NUMBER_OF_COL-1].isWall = true;
}
for (let col = 0; col < NUMBER_OF_COL; col++) {
    if (col==START_COL && (0==START_ROW || START_ROW==NUMBER_OF_ROW-1)) continue;
    if (col==END_COL && (0==END_ROW || END_ROW ==NUMBER_OF_ROW-1)) continue;
    grid[0][col].isWall=true;
    grid[NUMBER_OF_ROW-1][col].isWall=true;
}
NUMBER_OF_COL-=1;
NUMBER_OF_ROW-=1;
  walls = [];
  rec(vertical, horizontal, grid, START_ROW, START_COL, END_ROW, END_COL);
  console.log("grid",grid);
  return grid;
}

const rec = (
  vertical,
  horizontal,
  grid,
  START_ROW,
  START_COL,
  END_ROW,
  END_COL
) => {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let direction = 0;
  let number = 0;
  if (vertical.length > horizontal.length) {
    direction = 0;
    number = generateOddRandomNumber(vertical);
  } else {
    direction = 1;
    number = generateOddRandomNumber(horizontal);
  }
  if (direction === 0) {
    addWall(direction, number,grid, vertical, horizontal,  START_ROW, START_COL, END_ROW, END_COL);
    rec(
      vertical.slice(0, vertical.indexOf(number)),
      horizontal,
      grid,
      START_ROW, START_COL, END_ROW, END_COL
    );
    rec(
      vertical.slice(vertical.indexOf(number) + 1),
      horizontal,
      grid,
      START_ROW, START_COL, END_ROW, END_COL
    );
  }
  else{
    addWall(direction, number,grid, vertical, horizontal, START_ROW, START_COL, END_ROW, END_COL);
    rec(
      vertical,
      horizontal.slice(0, horizontal.indexOf(number)),
      grid,
      START_ROW, START_COL, END_ROW, END_COL
    );
    rec(
      vertical,
      horizontal.slice(horizontal.indexOf(number) + 1),
      grid,
      START_ROW, START_COL, END_ROW, END_COL
    );
  }
};

function addWall(dir, num,grid, vertical, horizontal, START_ROW, START_COL, END_ROW, END_COL) {
  let isStartFinish = false;
  let tempWalls = [];
  if (dir === 0) {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
      if (
        (temp === START_ROW && num === START_COL) ||
        (temp === END_ROW && num === END_COL)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if (
        (temp === START_ROW && num === START_COL) ||
        (temp === END_ROW && num === END_COL)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([num, temp]);
    }
  }
  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
    if (wall==undefined) continue;
    // console.log("wall",wall);
    // console.log("wall[0]",wall[0]);
    
    grid[wall[0]][wall[1]].isWall = true;
  }
}

function generateRandomNumber(max) {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return randomNum;
}
function generateOddRandomNumber(array) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}

export default recursiveDivision;
