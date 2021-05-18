const chebyshev = (END_ROW, END_COL, CUR_ROW, CUR_COL) => {
    const dy = Math.abs(END_COL-CUR_COL);
    const dx = Math.abs(END_ROW-CUR_ROW);
    const distance = Math.max(dy,dx);
    return distance;    
};


export default chebyshev;