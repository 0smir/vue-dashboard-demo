export default {
  addTask(state, payload) {
    state.tasks.push(payload);
  },
  setTasks(state, payload) {
    state.tasks = payload;
  },
  setTask(state, payload) {
    state.task = payload;
  },
  updateTask(state, payload) {
    state.task = { ...state.task, ...payload };
  }
}