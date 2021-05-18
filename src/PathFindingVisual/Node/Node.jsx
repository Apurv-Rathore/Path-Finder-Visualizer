import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount()

  render() {
    const {
      isFinish,
      isStart,
      inPath,
      inPathFirst,
      inShortestPath,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,col,
      direction
    } = this.props;

    let extraClassName = "";
    let arrowClassName = "";
    // console.log(this.props);
    // if (isFinishNode){
    //     extraClassName = isFinishNode
    // }
    // console.log(isFinishNode)
    if (inPath) {
      extraClassName = "inPath";
    }
    if (inPathFirst) {
      extraClassName = "inPathFirst";
    }
    if (inShortestPath) {
      extraClassName = "inShortestPath";
      if (direction=="U"){
        arrowClassName = "down";
      }
      if (direction=="D"){
        arrowClassName = "up";
      }
      if (direction=="L"){
        arrowClassName = "right";
      }
      if (direction=="R"){
        arrowClassName = "left";
      }
    }
    if (isFinish) {
        extraClassName = "isFinish";
    } else if (isStart) {
        extraClassName = "isStart";
    }
    if (isWall) {
      extraClassName = "isWall";
    }
    return <div onMouseDown={() => onMouseDown(row, col)}
    onMouseEnter={() => onMouseEnter(row, col)}
    // draggable={true?extraClassName==="isFinish":false}
    onMouseUp={() => onMouseUp()} className={`node ${extraClassName} ${arrowClassName}` }>
      <div className={` ${arrowClassName}`}></div>
      {/* <div
      className = {`innode ${extraClassName} ${arrowClassName}`}
      ></div> */}
    </div>;
  }
}
