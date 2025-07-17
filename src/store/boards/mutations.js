export default {
  updateBoardFilter(state, payload) {
    state.boardColumns.push(payload);
  },
  addBoard(state, payload) {
    state.board.push(payload);
  },
  setBoard(state, payload) {
    if (Object.keys(payload).length === 0) {
      state.board = null
    } else {
      state.board = payload;
    }
  },
  updateBoardInfo(state, payload){
    let {property, newValue} = payload;
    state.board[property] = newValue;
  },
  setBoardsList(state, payload){
    state.boardsList = payload;
  },
  addTaskToBoard(state, payload) {
    console.log('set task unit to board');
  },

  updateBoardTasksList(state, payload) {
    let { boardId, tasksList } = payload;
    let boardTasksList = JSON.parse(localStorage.getItem('boardTasksList')) || {};
    boardTasksList[boardId] = tasksList;

    state.boardTasksList = tasksList;
    localStorage.setItem('boardTasksList', JSON.stringify(boardTasksList));
  },
  setBoardFilterParams(state, payload) {
    let boardsList = JSON.parse(localStorage.getItem('boardsFilterParams')) || {};
    boardsList[payload.boardId] = payload.params;

    state.boardFilterParms = payload.params;
    localStorage.setItem('boardsFilterParams', JSON.stringify(boardsList));
  }
}