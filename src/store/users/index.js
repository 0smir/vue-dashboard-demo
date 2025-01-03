import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";


export default {
  namespaced: true,
  state() {
    return {
      userID: null,
      token: null,
      didAutoLogout: false,
      user: null
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}