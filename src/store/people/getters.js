export default {
  getEmployeesList(state) {
    console.log(state.people);
    return state.people;
  },
  getPositionsList(state) {
    console.log(state.positionsList);
    return state.positionsList;
  }
}