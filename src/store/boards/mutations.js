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
  updateBoardInfo(state, payload) {
    let { property, newValue } = payload;
    state.board[property] = newValue;
  },
  setBoardsList(state, payload) {
    state.boardsList = payload;
  },
  addTaskToBoard(state, payload) {
    let { boardID, taskID } = payload;
    let boardTasksStorage = JSON.parse(localStorage.getItem('boardTasksList')) || {};
    boardTasksStorage[boardID].push(taskID);
    state.boardsTasksList.push(taskID);
  },

  updateBoardTasksList(state, payload) {
    let { boardId, tasksList } = payload;
    let boardTasksArr = Object.values(tasksList);
    let boardTasksList = JSON.parse(localStorage.getItem('boardTasksList')) || {};
    boardTasksList[boardId] = boardTasksArr;

    state.boardTasksList = tasksList;
    localStorage.setItem('boardTasksList', JSON.stringify(boardTasksList));
  },
  resetBoardTasksList(state, payload) {
    let { tasksList } = payload;
    state.boardsTaskList = tasksList;
  },
  setBoardFilterParams(state, payload) {
    let boardsList = JSON.parse(localStorage.getItem('boardsFilterParams')) || {};
    boardsList[payload.boardId] = payload.params;

    state.boardFilterParms = payload.params;
    localStorage.setItem('boardsFilterParams', JSON.stringify(boardsList));
  }
}