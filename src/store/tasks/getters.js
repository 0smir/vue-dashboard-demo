export default {
  getTasksList(state) {
    return state.tasks;
  },
  getTaskInfo(state) {
    return state.task;
  },
  getPriorityList(state) {
    return state.taskPriorityList;
  },
  getStatusList(state) {
    return state.taskStatusList;
  },
  getTaskActionsList(state) {
    return state.taskActions;
  }
}