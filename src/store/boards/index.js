import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      boardColumns: [],
      defaultBoardCollumns: ['toDo', 'inProgress', 'Done'],
      boardFilter: {
        boardCollumns: [],
        assegneeList: [],

      }
    }
  },
  actions,
  getters,
  mutations
}

