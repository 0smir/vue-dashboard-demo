export default {
  getBoardData(state) {
    return state.board;
  },
  getDefaultBoardColumns(state) {
    return state.defaultBoardCollumns;
  },
  getBoardColumns(state) {
    return state.boardColumns;
  },
  getBoardFilterParms(state) {
    return state.boardFilterParms;
  },
  getBoardTasksList(state) {
    return state.boardTasksList;
  }
}