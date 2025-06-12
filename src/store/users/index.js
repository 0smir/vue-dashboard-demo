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
      user: JSON.parse(localStorage.getItem('userProfileData')) ? JSON.parse(localStorage.getItem('userProfileData')) : null
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}