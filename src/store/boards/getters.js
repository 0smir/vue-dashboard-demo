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
    let boardId = state.board.id;
    return JSON.parse(localStorage.getItem('boardsFilterParams'))[boardId] ? JSON.parse(localStorage.getItem('boardsFilterParams'))[boardId].params : state.boardFilterParms;
  },
  getBoardTasksList(state) {
    return state.boardTasksList;
  }
}