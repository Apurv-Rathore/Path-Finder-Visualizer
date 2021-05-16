import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFinding.css";

import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";

import nodesInShortestPath from "../helper functions/nodesInShortestPath";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//constants
const START_ROW = 10;
const START_COL = 10;
const END_ROW = 10;
const END_COLUMN = 31;

const NUMBER_OF_ROW = 16;
const NUMBER_OF_COL = 49;

export default class PathFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      currentAlgo: "BFS",
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(false,[]);
    this.setState({ grid });
  }

  //mouse events
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    if (col === END_COLUMN && row === END_ROW) {
      this.setState({ grid: this.state.grid, mouseIsPressed: true });
    } else {
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (col === END_COLUMN && row === END_ROW) {
      return;
    }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder, algo) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        if (nodesInShortestPathOrder === -1) {
          return;
        }
        if (algo == "DFS") {
          setTimeout(() => {
            this.animateShortestPath(visitedNodesInOrder);
          }, 5 * i);
        } else {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 5 * i);
        }
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const end_row = node[0];
        const end_col = node[1];
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].inPathFirst = true;
        this.setState({ newGrid });
      }, i);
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const end_row = node[0];
        const end_col = node[1];
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].inPathFirst = false;
        newGrid[end_row][end_col].inPath = true;

        this.setState({ newGrid });
      }, 1.1 * i);
    }
  }

  //this function makes the inshortestpath properity of the row and column true and uses setTimeout
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const end_row = node[0];
        const end_col = node[1];
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].inPathFirst = false;
        newGrid[end_row][end_col].inPath = false;
        newGrid[end_row][end_col].inShortestPath = true;
        this.setState({ newGrid });
      }, 10 * i);
    }
  }

  //function for resetting the grid
  resetGrid = () => {
    const grid = getInitialGrid(false,[]);
    this.setState({ grid });
  };

  drawArrows = (parent) => {
    let end_row = END_ROW;
    let end_col = END_COLUMN;
    while (end_row !== START_ROW || end_col !== START_COL) {
      // let newGrid = this.state.grid;
      // newGrid[end_row][end_col].direction = parent[end_row][end_col];
      // this.setState({ newGrid });

      if (parent[end_row][end_col] == "U") {
        end_row -= 1;
        if (end_col === START_COL && end_row === START_ROW) {
          break;
        }
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].direction = "U";
        this.setState({ newGrid });
      } else if (parent[end_row][end_col] == "D") {
        end_row += 1;
        if (end_col === START_COL && end_row === START_ROW) {
          break;
        }
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].direction = "D";
        this.setState({ newGrid });
      } else if (parent[end_row][end_col] == "L") {
        end_col -= 1;
        if (end_col === START_COL && end_row === START_ROW) {
          break;
        }
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].direction = "L";
        this.setState({ newGrid });
      } else {
        end_col += 1;
        if (end_col === START_COL && end_row === START_ROW) {
          break;
        }
        let newGrid = this.state.grid;
        newGrid[end_row][end_col].direction = "R";
        this.setState({ newGrid });
      }
    }
  };

  parent = -1;
  visualizeAlgo = () => {
    if (this.state.currentAlgo == "BFS") {
      console.log("in bfs");
      let { parent, visitedNodesInOrder } = bfs(
        START_ROW,
        START_COL,
        END_ROW,
        END_COLUMN,
        this.state.grid,
        NUMBER_OF_COL,
        NUMBER_OF_ROW
      );
      let nodesInShortestPathOrder = -1;
      if (parent !== -1) {
        nodesInShortestPathOrder = nodesInShortestPath(
          parent,
          START_ROW,
          START_COL,
          END_ROW,
          END_COLUMN
        );
        this.drawArrows(parent);
      }
      this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder, "BFS");
    } else if (this.state.currentAlgo === "DFS") {
      console.log("in dfs");
      let { parent, visitedNodesInOrder } = dfs(
        START_ROW,
        START_COL,
        END_ROW,
        END_COLUMN,
        this.state.grid,
        NUMBER_OF_COL,
        NUMBER_OF_ROW
      );
      // console.log("visitedNodesInOrder",visitedNodesInOrder);
      let nodesInShortestPathOrder = -1;
      if (parent !== -1) {
        nodesInShortestPathOrder = nodesInShortestPath(
          parent,
          START_ROW,
          START_COL,
          END_ROW,
          END_COLUMN
        );
        this.drawArrows(parent);
      }
      this.animateAlgo(visitedNodesInOrder, visitedNodesInOrder, "DFS");
    }

    // let end_row = END_ROW;
    // let end_col = END_COLUMN;
    // while (end_row !== START_ROW || end_col !== START_COL) {
    //   let newGrid = this.state.grid;
    //   newGrid[end_row][end_col].direction = parent[end_row][end_col];
    //   this.setState({ newGrid });
    //   if (parent[end_row][end_col] == "U") {
    //     end_row -= 1;
    //   } else if (parent[end_row][end_col] == "D") {
    //     end_row += 1;
    //   } else if (parent[end_row][end_col] == "L") {
    //     end_col -= 1;
    //   } else {
    //     end_col += 1;
    //   }
    // }
  };

  clearPath = () => {
    this.setState({grid: getInitialGrid(true,this.state.grid)})
  };

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div className="headerr" style={{ marginBottom: 70 }}>
          <div className="navbarr">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand
                href="#home"
                style={{ marginLeft: 4, fontSize: 35 }}
              >
                The PathFinder
              </Navbar.Brand>
              {/* <Button
                style={{ marginRight: 10 }}
                onClick={() => this.resetGrid()}
              >
                Reset Grid
              </Button> */}
              <Nav.Link
                style={{ marginRight: 10, fontSize: 25 }}
                onClick={() => this.resetGrid()}
              >
                Reset Grid
              </Nav.Link>

              <Nav.Link
                style={{ marginRight: 10, fontSize: 25 }}
                onClick={() => this.clearPath()}
              >
                Clear Path
              </Nav.Link>

              <Button
                onClick={() => this.visualizeAlgo()}
                style={{ marginRight: 20, marginLeft: 20, fontSize: 20 }}
              >
                Visualize {this.state.currentAlgo}
              </Button>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link
                    style={{ marginRight: 10, fontSize: 25, color: "#0d6efd" }}
                  >
                    Maze and Pattern
                  </Nav.Link>
                  <NavDropdown
                    title="Algorithms"
                    id="collasible-nav-dropdown"
                    style={{ marginRight: 10, fontSize: 25, color: "#0d6efd" }}
                  >
                    <NavDropdown.Item
                      onClick={() => this.setState({ currentAlgo: "BFS" })}
                    >
                      Breath first search
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.setState({ currentAlgo: "DFS" })}
                    >
                      Depth first search
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.setState({ currentAlgo: "ASTAR" })}
                    >
                      A*
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.setState({ currentAlgo: "DIJKSTRA" })}
                    >
                      Dijkstra
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav></Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    inPath,
                    inPathFirst,
                    inShortestPath,
                    direction,
                  } = node;
                  return (
                    <Node
                      direction={direction}
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      inPath={inPath}
                      inPathFirst={inPathFirst}
                      inShortestPath={inShortestPath}
                      isWall={isFinish || isStart ? false : isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = (isClearPath,gridArg) => {
  if (isClearPath) {
    let grid = gridArg;
    for (let row = 0; row < NUMBER_OF_ROW; row++) {
      for (let col = 0; col < NUMBER_OF_COL; col++) {
        // currentRow.push(createNode(col, row, isClearPath));
        
        grid[row][col].isVisited =  false
        // grid[row][col].isWall =  false,
        grid[row][col].previousNode =  null
        grid[row][col].inPath =  false
        grid[row][col].inPathFirst =  false
        grid[row][col].inShortestPath =  false
        grid[row][col].direction =  ""
      }
    }
    return grid;
  }
  const grid = [];
  for (let row = 0; row < NUMBER_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COL; col++) {
      currentRow.push(createNode(col, row, isClearPath));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, isClearPath) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === END_ROW && col === END_COLUMN,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    inPath: false,
    inPathFirst: false,
    inShortestPath: false,
    direction: "",
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
