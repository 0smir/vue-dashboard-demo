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
  addTaskToBoard(state, payload) {
    console.log('set task unit to board');
  },

  updateBoardTasksList(state, payload) {
    state.boardTasksList = payload;
  },
  setBoardFilterParams(state, payload) {
    state.boardFilterParms = payload.params;
    localStorage.setItem('boardsFilterParams', JSON.stringify({ [payload.boardId]: { params: payload.params } }));
  }
}