import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      people: JSON.parse(localStorage.getItem('employees')) ? JSON.parse(localStorage.getItem('employees')) : [],
      positionsList: ['Front-End', 'Back-End', 'QA', 'Manager', 'Product Owner', 'SEO', 'Designer']
    }
  },
  actions,
  getters,
  mutations
}