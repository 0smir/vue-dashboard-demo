export default {
  addEmployee(state, payload) {
    state.people.push(payload);
  },
  setEmployees(state, payload) {
    console.log('payload', payload);
    state.people = payload;
    console.log('state.people', state.people);
  }
}