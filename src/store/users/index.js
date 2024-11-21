import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";


export default {
  namespaced: true,
  store() {
    return {
      users: []

    }

  },
  mutations: mutations,
  actions: actions,
  getters: getters
}