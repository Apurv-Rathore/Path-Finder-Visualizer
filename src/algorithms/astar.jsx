//importing heurstic
import manhattan from "../Heuristic/manhattan";
import chebyshev from "../Heuristic/chebyshev";
import octile from "../Heuristic/octile";
import euclidean from "../Heuristic/euclidean";

const heuristic = (END_ROW, END_COL, CUR_ROW, CUR_COL, currentHeuristic) => {
  // return Math.abs(END_COL - CUR_COL) + Math.abs(END_ROW - CUR_ROW);
  // console.log("currentHeuristic",currentHeuristic);
  if (currentHeuristic == "Manhattan") {
    // console.log("in manhattan");
    const ans =  manhattan(END_ROW, END_COL, CUR_ROW, CUR_COL);
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

const constructPath = (cameFrom, er, ec, sr, sc) => {
  let path = [];
  let x = cameFrom[[er, ec]];
  // console.log(c)
  path.push(x);
  while (x[0] != sr && x[1] != sc) {
    x = cameFrom[x];
    path.push(x);
  }
  return path;
};

class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }
  dequeue() {
    
    return this.items.shift();
  }

  isEmpty() {
    if (this.items.length === 0) return true;
    return false;
  }

  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + " ";
    return str;
  }

  //   checkIfPresent(element){

  //   }
}

const astar = (
  START_ROW,
  START_COL,
  END_ROW,
  END_COLUMN,
  grid,
  NUMBER_OF_COL,
  NUMBER_OF_ROW,
  currentHeuristic
) => {
  let queue = new PriorityQueue();
  let cameFrom = {};
  let vis = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    let currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      currentRow.push(false);
    }
    vis.push(currentRow);
  }

  let parent = [];
  for (let row = 0; row < NUMBER_OF_ROW + 1; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL + 1; col++) {
      currentRow.push("N");
    }
    parent.push(currentRow);
  }

  let gScore = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    let currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      currentRow.push(100000000);
    }
    gScore.push(currentRow);
  }
  gScore[START_ROW][START_COL] = 0;

  let fScore = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    let currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      currentRow.push(100000000);
    }
    fScore.push(currentRow);
  }
  //   console.log("fScore", fScore);
  fScore[START_ROW][START_COL] = heuristic(
    END_ROW,
    END_COLUMN,
    START_ROW,
    START_COL,
    currentHeuristic
  );
  //   let vis = {};
  //   console.log("fScore",fScore);
  let visitedNodes = [];
  queue.enqueue([START_ROW, START_COL], fScore[START_ROW][START_COL]);
  vis[START_ROW][START_COL] = true;
  const goal = [END_ROW, END_COLUMN];
  //   console.log("f");
  while (queue.isEmpty() === false) {
    // console.log("conetnets",queue.printPQueue());
    let minFScoreNode = queue.dequeue().element;
    // console.log(minFScoreNode);
    // console.log("compare",minFScoreNode,goal)
    if (goal[0] === minFScoreNode[0] && goal[1] === minFScoreNode[1]) {
      //   console.log("compeed the astar");
      console.log(cameFrom);
      //   return constructPath(cameFrom, END_ROW, END_COLUMN, START_ROW, START_COL);
      return { parent, visitedNodes };
    }
    const x = minFScoreNode[0];
    const y = minFScoreNode[1];
    visitedNodes.push([x, y]);
    let newx = x + 1;
    let newy = y;
    if (newx < NUMBER_OF_ROW) {
      if (grid[newx][newy].isWall == false) {
        const tent_score = gScore[x][y] + 1;
        //   console.log("tent_score", tent_score);
        if (tent_score < gScore[newx][newy]) {
          cameFrom[[newx, newy]] = [x, y];
          gScore[newx][newy] = tent_score;
          fScore[newx][newy] =
            gScore[newx][newy] + heuristic(END_ROW, END_COLUMN, newx, newy,currentHeuristic);
          if (vis[newx][newy] === false) {
            vis[newx][newy] = true;
            parent[newx][newy] = "U";
            queue.enqueue([newx, newy], fScore[newx][newy]);
            // console.log("f");
          }
        }
      }
    }
    // console.log(newx, NUMBER_OF_ROW);

    newx = x - 1;
    newy = y;
    if (newx >= 0) {
      if (grid[newx][newy].isWall == false) {
        const tent_score = gScore[x][y] + 1;
        if (tent_score < gScore[newx][newy]) {
          cameFrom[[newx, newy]] = [x, y];
          gScore[newx][newy] = tent_score;
          fScore[newx][newy] =
            gScore[newx][newy] + heuristic(END_ROW, END_COLUMN, newx, newy);
          if (vis[newx][newy] === false) {
            vis[newx][newy] = true;
            parent[newx][newy] = "D";
            queue.enqueue([newx, newy], fScore[newx][newy]);
          }
        }
      }
    }

    newx = x;
    newy = y - 1;
    if (newy >= 0) {
      if (grid[newx][newy].isWall == false) {
        const tent_score = gScore[x][y] + 1;
        if (tent_score < gScore[newx][newy]) {
          cameFrom[[newx, newy]] = [x, y];
          gScore[newx][newy] = tent_score;
          fScore[newx][newy] =
            gScore[newx][newy] + heuristic(END_ROW, END_COLUMN, newx, newy);
          if (vis[newx][newy] === false) {
            vis[newx][newy] = true;
            parent[newx][newy] = "R";
            queue.enqueue([newx, newy], fScore[newx][newy]);
          }
        }
      }
    }

    newx = x;
    newy = y + 1;
    if (newy < NUMBER_OF_COL) {
      if (grid[newx][newy].isWall == false) {
        const tent_score = gScore[x][y] + 1;
        if (tent_score < gScore[newx][newy]) {
          cameFrom[[newx, newy]] = [x, y];
          gScore[newx][newy] = tent_score;
          fScore[newx][newy] =
            gScore[newx][newy] + heuristic(END_ROW, END_COLUMN, newx, newy,currentHeuristic);
          if (vis[newx][newy] === false) {
            vis[newx][newy] = true;
            parent[newx][newy] = "L";
            queue.enqueue([newx, newy], fScore[newx][newy]);
          }
        }
      }
    }
    // for (let row = 0; row < NUMBER_OF_ROW ; row++) {
    //   for (let col = 0; col < NUMBER_OF_COL ; col++) {
    //     if (fScore[row][col]<currentminFScoreValue){
    //         currentminFScoreValue=  fScore[row][col];
    //         minFScoreNode = [row,col];
    //     }
    //   }
    // }
  }
  return { parent: -1, visitedNodes };
};

// const astar = (
//   START_ROW,
//   START_COL,
//   END_ROW,
//   END_COLUMN,
//   grid,
//   NUMBER_OF_COL,
//   NUMBER_OF_ROW
// ) => {};

export default astar;
