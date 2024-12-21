export default {
  userID(state) {
    return state.userID;
  },
  isAuthenticated(state) {
    console.log(state);
    return !!state.token;
  }
}