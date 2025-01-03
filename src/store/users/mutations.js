export default {
  setUser(state, payload) {
    console.log('setUser: ', payload);

    state.token = payload.token;
    state.userID = payload.userID;
    state.didAutoLogout = false;
  },

  setUserData(state, payload) {
    state.user = payload;
  }
}