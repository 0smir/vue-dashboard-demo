import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      tasks: [
        {
          id: '001',
          title: 'Task #1 - Be happy',
          description: 'Moust important task. Be happy every day. First of all take ceare about yourself',
          creator: 'Helga Vaal',
          assignee: '',
          priority: 'urgent',
          status: 'toDo',
        },
        {
          id: '002',
          title: 'Task #2',
          description: 'Be healthy',
          creator: 'Helga Vaal',
          assignee: '',
          priority: 'urgent',
          status: 'inProgress',
        },
        {
          id: '003',
          title: 'Task #3',
          description: 'Be confident',
          creator: 'Helga Vaal',
          assignee: '',
          priority: 'low',
          status: 'toDo',
        },
        {
          id: '004',
          title: 'Task #4',
          description: 'Get Help of psychotherapist',
          creator: 'Helga Vaal',
          assignee: '',
          priority: 'urgent',
          status: 'inProgress',
        },
        {
          id: '005',
          title: 'Task #5',
          description: 'Pass Vue3 course',
          creator: 'Helga Vaal',
          assignee: '',
          priority: 'urgent',
          status: 'Done',
        }
      ],
      taskPriorityList: ['blocker', 'critical', 'high', 'medium', 'low', 'trivial'],
      taskStatusList: ['toDo', 'inProgress', 'inReview', 'Testing', 'Done', 'Blocked'],
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}
