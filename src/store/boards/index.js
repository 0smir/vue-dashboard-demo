import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      board: null,
      boardsList: [],
      boardTasksList: JSON.parse(localStorage.getItem('boardTasksList')) ? JSON.parse(localStorage.getItem('boardTasksList')) : [],
      boardColumns: [],
      defaultBoardCollumns: ['toDo', 'inProgress', 'Done'],
      boardFilterParms: {
        columns: [],
        priority: [],
        people: []
      }
    }
  },
  actions,
  getters,
  mutations
}

