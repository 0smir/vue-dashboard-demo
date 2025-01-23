export default {
  addTask(state, payload) {
    state.tasks.push(payload);
  },
  setTasks(state, payload) {
    state.tasks = payload;
  },
  setTask(state, payload) {
    if (Object.keys(payload).length === 0) {
      state.task = null
    } else {
      state.task = payload;
    }
  },
  updateTask(state, payload) {
    state.task = { ...state.task, ...payload };
  },
  removeTask(state, payload) {
    let id = payload.id;
    let index = state.tasks.findIndex((item) => item.id === id);
    state.task = null;
    state.tasks.splice(index, 1);
  }
}