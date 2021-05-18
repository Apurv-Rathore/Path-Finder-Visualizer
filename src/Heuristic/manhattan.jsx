const manhattan = (END_ROW, END_COL, CUR_ROW, CUR_COL) => {
    return Math.abs(END_COL - CUR_COL) + Math.abs(END_ROW - CUR_ROW);
};


export default manhattan;