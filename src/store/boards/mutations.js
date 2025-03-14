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
  updateBoardTasksList(state, payload) {
    console.log("updateBardsTasksList: ", payload);
    state.boardsTasksList.push(payload.id);
  }
}