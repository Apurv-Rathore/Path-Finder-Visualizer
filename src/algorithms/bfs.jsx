class Queue {
  constructor() {
    this.items = [];
  }

  // add element to the queue
  enqueue(element) {
    return this.items.push(element);
  }

  // remove element from the queue
  dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  }

  // check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // empty the queue
  clear() {
    this.items = [];
  }
}
const bfs = (START_ROW, START_COL, END_ROW, END_COLUMN, grid,NUMBER_OF_COL,NUMBER_OF_ROW) => {
  // console.log(END_ROW,END_COLUMN)

  let visitedNodesInOrder = [];

  //making visited array
  let visited = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      currentRow.push(false);
    }
    visited.push(currentRow);
  }

  //creating parent array to keep track of parent so that we can backtrack the steps
  let parent = [];
  for (let row = 0; row < NUMBER_OF_ROW+1; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL+1; col++) {
      currentRow.push("N");
    }
    parent.push(currentRow);
  }

  //making queue
  let queue = new Queue();
  queue.enqueue([START_ROW, START_COL]);
  visited[START_ROW][START_COL] = true;
  while (queue.isEmpty() == false) {
    const front = queue.dequeue();
    let x = front[0];
    let y = front[1];
    visitedNodesInOrder.push([x, y]);
    if (x == END_ROW && y == END_COLUMN) {
      return { parent, visitedNodesInOrder };
    }
    if (x + 1 < NUMBER_OF_ROW) {
      x += 1;
      
      if (grid[x][y].isWall == false) {
        if (visited[x][y] == false) {
          visited[x][y] = true;
          parent[x][y] = "U";
          queue.enqueue([x, y]);
        }
      }
      x -= 1;
    }
    if (x > 0) {
      x -= 1;
      
      if (grid[x][y].isWall == false) {
        if (visited[x][y] == false) {
          visited[x][y] = true;
          parent[x][y] = "D";
          queue.enqueue([x, y]);
        }
      }
      x += 1;
    }
    if (y + 1 < NUMBER_OF_COL) {
      y += 1;
      
      if (grid[x][y].isWall == false) {
        if (visited[x][y] == false) {
          visited[x][y] = true;
          parent[x][y] = "L";
          queue.enqueue([x, y]);
        }
      }
      y -= 1;
    }
    if (y > 0) {
      y -= 1;
      
      if (grid[x][y].isWall == false) {
        if (visited[x][y] == false) {
          visited[x][y] = true;
          parent[x][y] = "R";
          queue.enqueue([x, y]);
        }
      }
      y += 1;
    }
  }
  return { parent:-1, visitedNodesInOrder };
  
};
export default bfs;
