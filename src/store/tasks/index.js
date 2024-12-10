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
          assignee: {
            id: '',
            name: 'Adam Shei',
            img: ''
          },
          priority: 'medium',
          status: 'toDo',
          comments: []
        },
        {
          id: '002',
          title: 'Task #2',
          description: 'Be healthy',
          creator: 'Helga Vaal',
          assignee: {
            id: '',
            name: 'Adam Shei',
            img: ''
          },
          priority: 'high',
          status: 'inProgress',
          comments: []
        },
        {
          id: '003',
          title: 'Task #3',
          description: 'Be confident',
          creator: 'Helga Vaal',
          assignee: {
            id: '',
            name: 'Adam Shei',
            img: ''
          },
          priority: 'low',
          status: 'toDo',
          comments: []
        },
        {
          id: '004',
          title: 'Task #4 - Get Help',
          description: 'Get Help of psychotherapist',
          creator: 'Helga Vaal',
          assignee: {
            id: '',
            name: 'Sashi Me',
            img: ''
          },
          priority: 'blocker',
          status: 'inProgress',
          comments: []
        },
        {
          id: '005',
          title: 'Task #5 Lerning',
          description: 'Pass Vue3 course',
          creator: 'Helga Vaal',
          assignee: {
            id: '',
            name: 'Helga Vaal',
            img: ''
          },
          priority: 'critical',
          status: 'Done',
          comments: []
        },
        {
          id: '006',
          title: 'Task #6 Personal borders',
          description: 'Build fluid Personal borders',
          creator: 'Helga Vaal',
          assignee: {
            id: '',
            name: 'Helga Vaal',
            img: ''
          },
          priority: 'trivial',
          status: 'Testing',
          comments: []
        }
      ],
      taskPriorityList: ['blocker', 'critical', 'high', 'medium', 'trivial', 'low'],
      taskStatusList: ['toDo', 'inProgress', 'inReview', 'Testing', 'Done', 'Blocked'],
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}
