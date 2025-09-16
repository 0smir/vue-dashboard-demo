export default {
  getBoardData(state) {
    return state.board;
  },
  getBoardsList(state) {
    return state.boardsList;
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