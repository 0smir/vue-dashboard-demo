export default {
  addEmployee(state, payload) {
    state.people.push(payload);
  },
  setEmployees(state, payload) {
    state.people = payload;
  }
}