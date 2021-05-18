const octile = (END_ROW, END_COL, CUR_ROW, CUR_COL) => {
    const dy = Math.abs(END_COL-CUR_COL);
    const dx = Math.abs(END_ROW-CUR_ROW);
    const distance = 1.141 * (Math.min(dx,dy)) + Math.abs(dx-dy);
    return distance;    
};


export default octile;