export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userID = payload.userID;
    state.didAutoLogout = false;
  },

  setUserData(state, payload) {
    state.user = payload;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
}