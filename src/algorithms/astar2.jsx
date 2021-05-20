// START_ROW,
//   START_COL,
//   END_ROW,
//   END_COLUMN,
//   grid,
//   NUMBER_OF_COL,
//   NUMBER_OF_ROW,
//   currentHeuristic
import manhattan from "../Heuristic/manhattan";
import chebyshev from "../Heuristic/chebyshev";
import octile from "../Heuristic/octile";
import euclidean from "../Heuristic/euclidean";

const heuristic = (END_ROW, END_COL, CUR_ROW, CUR_COL, currentHeuristic) => {
  // return Math.abs(END_COL - CUR_COL) + Math.abs(END_ROW - CUR_ROW);
  // console.log("currentHeuristic",currentHeuristic);
  if (currentHeuristic == "Manhattan") {
    // console.log("in manhattan");
    const ans = manhattan(END_ROW, END_COL, CUR_ROW, CUR_COL);
    return ans;
    // return Math.abs(END_COL - CUR_COL) + Math.abs(END_ROW - CUR_ROW);
  }
  if (currentHeuristic == "Chebyshev") {
    return chebyshev(END_ROW, END_COL, CUR_ROW, CUR_COL);
  }
  if (currentHeuristic == "Octile") {
    return octile(END_ROW, END_COL, CUR_ROW, CUR_COL);
  }
  if (currentHeuristic == "Euclidean") {
    return euclidean(END_ROW, END_COL, CUR_ROW, CUR_COL);
  }
};

class Node {
  constructor(parent, position) {
    this.parent = parent;
    this.position = position;
    this.g = 0;
    this.h = 0;
    this.f = 0;
  }
  isEqual(other) {
    if (
      this.position[0] === other.position[0] &&
      this.position[1] === other.position[1]
    ) {
      return true;
    }
    return false;
  }
}

const return_path = (current_node, grid, NUMBER_OF_ROW, NUMBER_OF_COL) => {
  let path = [];
  let result = [];
  for (let index = 0; index < NUMBER_OF_ROW; index++) {
      let roww = [];
      for (let j = 0; j < NUMBER_OF_COL; j++) {
          roww.push("N");
      }
      result.push(roww);
  }
  let current = current_node;

  while (current !== undefined) {
    path.push(current.position);
    // console.log(current);
    if (current.parent==undefined) break;
    const pr = current.parent.position[0];
    const pc = current.parent.position[1];

    const cr = current.parent.position[0];
    const cc = current.parent.position[1];

    if (cr===pr){
        if ( pc+1===cc){
            result[cr][cc]="U"
        }
        else{
            result[cr][cc]="D"
        }
    }
    if (cc==pc){
        if (cr+1==pr){
            result[cr][cc]="L"
        }
        else{
            result[cr][cc]="R"
        }
    }
    current = current.parent;
  }
//   console.log(path);
  return path;
};

export function astar2(
  START_ROW,
  START_COL,
  END_ROW,
  END_COLUMN,
  grid,
  NUMBER_OF_COL,
  NUMBER_OF_ROW,
  currentHeuristic
) {
  let start_node = new Node(undefined, [START_ROW, START_COL]);
  start_node.g = 0;
  start_node.f = 0;
  start_node.h = 0;

  let end_node = new Node(undefined, [END_ROW, END_COLUMN]);
  end_node.g = 0;
  end_node.f = 0;
  end_node.h = 0;

  let yet_to_visit_list = [];
  let visited_list = [];

  let visitedNodesInOrder = [];

  yet_to_visit_list.push(start_node);

  let outer_iterations = 0;
  let max_iterations = 10;
  let move = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  while (yet_to_visit_list.length !== 0) {
    outer_iterations += 1;
    let current_node = yet_to_visit_list[0];
    let current_index = 0;
    for (let i = 0; i < yet_to_visit_list.length; i++) {
      let index = i;
      let item = yet_to_visit_list[i];
      if (item.f < current_node.f) {
        current_node = item;
        current_index = index;
      }
    }
    if (outer_iterations > max_iterations * 10000) {
      alert("too many iterations");
      return {path:-1,visitedNodesInOrder};
    }
    // yet_to_visit_list.filter((thing) => thing!==current_node);

    let newyettovisitlist = [];
    for (let indexxx = 0; indexxx < yet_to_visit_list.length; indexxx++) {
      if (indexxx !== current_index) {
        newyettovisitlist.push(yet_to_visit_list[indexxx]);
      }
    }
    yet_to_visit_list = [];
    for (let indexxx = 0; indexxx < newyettovisitlist.length; indexxx++) {
      yet_to_visit_list.push(newyettovisitlist[indexxx]);
    }
    visited_list.push(current_node);
    // console.log(end_node);
    // if ((current_node.position[0] === end_node.position[0]) && (current_node.position[1] === end_node.position[1])) {
    if (end_node.isEqual(current_node)) {
      // console.log("current_node",current_node.row,current_node.col);
      // console.log("end_node",end_node.row,end_node.col);
      return {path:return_path(current_node, grid, NUMBER_OF_ROW, NUMBER_OF_COL),visitedNodesInOrder};
    }

    let childrens = [];

    for (let indexx = 0; indexx < move.length; indexx++) {
      const new_position = move[indexx];
      let nodeposition = [
        current_node.position[0] + new_position[0],
        current_node.position[1] + new_position[1],
      ];
      if (
        nodeposition[0] >= NUMBER_OF_ROW ||
        nodeposition[0] < 0 ||
        nodeposition[1] >= NUMBER_OF_COL ||
        nodeposition[1] < 0
      ) {
        continue;
      }

      if (grid[nodeposition[0]][nodeposition[1]].isWall === true) continue;
      let new_node = new Node(current_node, nodeposition);
      childrens.push(new_node);
    }

    for (let indexx = 0; indexx < childrens.length; indexx++) {
      const child = childrens[indexx];

      if (visited_list.includes(child)) continue;
      child.g = current_node.g + 1;

        child.g = Math.pow(END_COLUMN-child.position[1],2)+Math.pow(END_ROW-child.position[0],2);

    //   child.h = heuristic(
    //     END_ROW,
    //     END_COLUMN,
    //     child.row,
    //     child.col,
    //     currentHeuristic
    //   );
      child.f = child.g + child.h;
      let flag = 0;
      for (let j = 0; j < yet_to_visit_list.length; j++) {
        const element = yet_to_visit_list[j];
        if ((child.isEqual(element)) && (child.g >= element.g)) {
          flag = 1;
          break;
        }
      }
      if (flag === 1) continue;
    //   console.log(child.position,child.f,child.g,child.h);
        visitedNodesInOrder.push(child.position);
      yet_to_visit_list.push(child);
    }
  }
}
export default astar2;
