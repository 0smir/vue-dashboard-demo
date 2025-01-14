import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      tasks: JSON.parse(sessionStorage.getItem('tasksList')) ? JSON.parse(sessionStorage.getItem('tasksList')) : [],
      task: null,
      taskPriorityList: ['blocker', 'critical', 'high', 'medium', 'trivial', 'low'],
      taskStatusList: ['Active', 'toDo', 'inProgress', 'inReview', 'Testing', 'Done', 'Blocked', 'Close'],
      taskActions: ['logtime', 'print', 'delete'],
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}
