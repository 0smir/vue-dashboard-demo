import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      tasks: [],
      task: null,
      taskPriorityList: ['blocker', 'critical', 'high', 'medium', 'trivial', 'low'],
      taskStatusList: ['toDo', 'inProgress', 'inReview', 'Testing', 'Done', 'Blocked'],
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}
