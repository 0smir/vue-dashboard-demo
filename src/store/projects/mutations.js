export default {
  addProject(state, payload) {
    console.log('addProject');

    state.projects.push(payload);
  }
}