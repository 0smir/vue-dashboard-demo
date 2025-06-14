import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      projectInfo: null,
      projects: JSON.parse(localStorage.getItem('projectsList')) ? JSON.parse(localStorage.getItem('projectsList')) : [],
      status: [{ id: 'active', value: 'Active' }, { id: 'completed', value: 'Completed' }, { id: 'hold', value: 'On hold' }],
      priority: [{ id: 'low', value: 'Low' }, { id: 'medium', value: 'Medium' }, { id: 'high', value: 'High' }]
    }
  },
  actions,
  getters,
  mutations
}