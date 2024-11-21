export default {
  async addTask(context, data) {
    const taskInfo = {
      id: data.id,
      title: data.value,
      project: data.value,
      assignee: data.value,
      description: data.value,
      priority: data.value,
      status: data.value
    }

    const resp = await fetch(
      `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${taskInfo.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(taskInfo)
      }
    )
    context.commit('addTask', taskInfo);
  },

  async loadTasks(context, data) {

    const url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList.json`;
    const result = await fetch(url);
    const resultData = await result.json();

    if (!result.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    let taskList = [];

    for (const key in resultData) {
      const task = {
        id: key,
        title: resultData[key].title,
        project: resultData[key].project,
        assignee: resultData[key].assignee.value,
        description: resultData[key].description,
        priority: resultData[key].priority,
        status: resultData[key].status
      };
      taskList.push(task);
    }

    context.commit('addTask', ...taskList);
  }

}