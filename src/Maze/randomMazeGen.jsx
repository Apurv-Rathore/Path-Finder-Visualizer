function randomMaze(
  grid,
  START_ROW,
  START_COL,
  END_ROW,
  END_COL,
  NUMBER_OF_ROW,
  NUMBER_OF_COL
) {
  //   if (!startNode || !finishNode || startNode === finishNode) {
  //     return false;
  //   }

  let newGrid = grid.slice();
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    if (row == START_ROW && (0 == START_COL || START_COL == NUMBER_OF_COL - 1))
      continue;
    if (row == END_ROW && (0 == END_COL || END_COL == NUMBER_OF_COL - 1))
      continue;
    newGrid[row][0].isWall = true;
    newGrid[row][NUMBER_OF_COL - 1].isWall = true;
  }
  for (let col = 0; col < NUMBER_OF_COL; col++) {
    if (col == START_COL && (0 == START_ROW || START_ROW == NUMBER_OF_ROW - 1))
      continue;
    if (col == END_COL && (0 == END_ROW || END_ROW == NUMBER_OF_ROW - 1))
      continue;
    newGrid[0][col].isWall = true;
    newGrid[NUMBER_OF_ROW - 1][col].isWall = true;
  }
  let walls = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      if (
        (row === START_ROW && col === START_COL) ||
        (row === END_ROW && col === END_COL)
      )
        continue;
      if (Math.random() < 0.33) {
        walls.push([row, col]);
        newGrid[row][col].isWall = true;
      }
    }
  }
  walls.sort(() => Math.random() - 0.5);
  return { walls, newGrid };
}
export default randomMaze;
