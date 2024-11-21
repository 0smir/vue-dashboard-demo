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
          project: ''
        }
      ],
      positionsList: ['Front-End', 'Back-End', 'QA', 'Manager', 'Product Owner', 'SEO']
    }
  },
  actions,
  getters,
  mutations
}