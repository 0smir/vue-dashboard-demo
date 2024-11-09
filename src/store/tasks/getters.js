export default {
  getTasksList(state) {
    return state.tasks;
  },
  getPriorityList(state) {
    return state.taskPriorityList;
  },
  getStatusList(state) {
    return state.taskStatusList;
  }
}