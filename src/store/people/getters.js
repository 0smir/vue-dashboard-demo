export default {
  getEmployeesList(state) {
    console.log('people getter', state.people);
    return state.people;
  },
  getPositionsList(state) {
    // console.log(state.positionsList);
    return state.positionsList;
  }
}