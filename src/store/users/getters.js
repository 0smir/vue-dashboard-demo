export default {
  userID(state) {
    return state.userID;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    console.log(state);
    return !!state.token;
  },
  getUserInfo(state) {
    return state.user;
  },
  getAutoLogoutInfo(state) {
    return state.didAutoLogout;
  }
}