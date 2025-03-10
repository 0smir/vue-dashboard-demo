import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      board: null,
      boardsList: [],
      boardColumns: [],
      defaultBoardCollumns: ['toDo', 'inProgress', 'Done'],
    }
  },
  actions,
  getters,
  mutations
}

