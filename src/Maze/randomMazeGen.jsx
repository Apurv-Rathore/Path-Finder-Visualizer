function randomMaze(grid,START_ROW,START_COL , END_ROW, END_COL,NUMBER_OF_ROW,NUMBER_OF_COL) {
//   if (!startNode || !finishNode || startNode === finishNode) {
//     return false;
//   }
  let newGrid = grid.slice();
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
  return {walls, newGrid};
}
export default randomMaze;
