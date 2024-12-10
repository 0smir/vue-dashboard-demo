export default {
  getEmployeesList(state) {
    console.log('people getter', state.people);
    return state.people;
  },
  getPositionsList(state) {
    return state.positionsList;
  }
}