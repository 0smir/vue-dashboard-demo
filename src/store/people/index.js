import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      people: [
        {
          id: '001',
          name: 'Helga',
          lastName: 'Vaal',
          position: 'Front-End',
          team: 'main'
        }
      ]
    }
  },
  actions,
  getters,
  mutations
}