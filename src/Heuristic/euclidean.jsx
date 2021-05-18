const euclidean = (END_ROW, END_COL, CUR_ROW, CUR_COL) => {
    const x = Math.abs(END_ROW-CUR_ROW)*Math.abs(END_ROW-CUR_ROW)
    const y = Math.abs(END_COL-CUR_COL)*Math.abs(END_COL-CUR_COL)
    const d = Math.pow(x+y,0.5);
    return d;

};


export default euclidean;