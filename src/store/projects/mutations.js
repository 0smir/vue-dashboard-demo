export default {
  addProject(state, payload) {
    console.log('addProject');
    state.projects.push(payload);
  },
  setProject(state, payload) {
    state.projectInfo = payload;
  },
  setProjectsList(state, payload) {
    state.projects = payload;
  }
}