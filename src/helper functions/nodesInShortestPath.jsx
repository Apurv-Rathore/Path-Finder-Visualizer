const nodesInShortestPath = (
  parent,
  START_ROW,
  START_COL,
  END_ROW,
  END_COLUMN
) => {
  // with the help of this function and the parent 2D array, we get the path from the source to the destination
  // in the order

  let end_row = END_ROW;
  let end_col = END_COLUMN;
  let nodesInShortestPathOrder = [];
  while (end_row !== START_ROW || end_col !== START_COL) {
    nodesInShortestPathOrder.push([end_row, end_col]);
    if (parent[end_row][end_col] == "U") {
      end_row -= 1;
    } else if (parent[end_row][end_col] == "D") {
      end_row += 1;
    } else if (parent[end_row][end_col] == "L") {
      end_col -= 1;
    } else {
      end_col += 1;
    }
  }
  nodesInShortestPathOrder.push([end_row, end_col]);
  nodesInShortestPathOrder.reverse();
  console.log(nodesInShortestPathOrder);
  return nodesInShortestPathOrder;
};

export default nodesInShortestPath;
