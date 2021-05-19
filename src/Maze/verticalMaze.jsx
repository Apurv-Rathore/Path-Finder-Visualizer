function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

const verticalMaze = (grid,START_ROW,START_COL , END_ROW, END_COL,NUMBER_OF_ROW,NUMBER_OF_COL) => {
    let newGrid = grid.slice();
    for (let row = 0; row < NUMBER_OF_ROW; row++) {
        if (row==START_ROW && (0==START_COL || START_COL==NUMBER_OF_COL-1)) continue;
        if (row==END_ROW && (0==END_COL || END_COL==NUMBER_OF_COL-1)) continue;
        newGrid[row][0].isWall = true;
        newGrid[row][NUMBER_OF_COL-1].isWall = true;
    }
    for (let col = 0; col < NUMBER_OF_COL; col++) {
        if (col==START_COL && (0==START_ROW || START_ROW==NUMBER_OF_ROW-1)) continue;
        if (col==END_COL && (0==END_ROW || END_ROW ==NUMBER_OF_ROW-1)) continue;
        newGrid[0][col].isWall=true;
        newGrid[NUMBER_OF_ROW-1][col].isWall=true;
    }
    for (let row=0;row<NUMBER_OF_ROW;row++){
        
        if (row%2===1) continue;
        let random = randomNumber(0,NUMBER_OF_COL);
        if (row===START_ROW || row===END_ROW){
            if (START_ROW===END_ROW){
                for (let col=0;col<NUMBER_OF_COL;col++){
                    if (col!==START_COL && col!==END_COL){
                        // console.log(newGrid);
                        newGrid[row][col].isWall = true;
                        // console.log(newGrid[row][col].isWall )
                    }
                }
                continue;
            }
            while(random!==START_COL && random!==END_COL){
                random = randomNumber(0,NUMBER_OF_COL);
            }
            // if (row===END_ROW){
            //     if (random===END_COL){
            //         random = randomNumber(0,NUMBER_OF_COL);
            //     }
            // }
            // if (row===START_ROW){
            //     if (random===START_COL){
            //         random = randomNumber(0,NUMBER_OF_COL);
            //     }
            // }
        }
        
        for (let col=0;col<NUMBER_OF_COL;col++){
            if (col!==random){
                // console.log(newGrid);
                newGrid[row][col].isWall = true;
                // console.log(newGrid[row][col].isWall )
            }
        }
    }
    return newGrid;
}

export default verticalMaze;