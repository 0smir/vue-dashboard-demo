export default {
  async addTask(context, data) {
    const taskInfo = {
      id: data.id,
      title: data.title,
      project: data.project,
      assignee: data.assignee,
      description: data.description,
      priority: data.priority,
      status: data.status,
      comments: []
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

  async loadTasks(context) {
    const url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList.json`;
    const result = await fetch(url);
    const resultData = await result.json();

    if (!result.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    let taskList = [];

    for (const key in resultData) {
      let task = {
        id: key,
        title: resultData[key].title,
        project: resultData[key].project,
        assignee: resultData[key].assignee,
        description: resultData[key].description,
        priority: resultData[key].priority,
        status: resultData[key].status,
        comments: resultData[key]?.comments
      };
      taskList.push(task);
    }
    context.commit('setTasks', taskList);
  },

  async getTaskData(context, data) {
    let taskID = data.id,
      url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${taskID}.json`;

    const resp = await fetch(url);
    const resultData = await resp.json();
    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setTask', { ...resultData });
  },

  async setTaskStatus(context, data) {
    let { id, status } = data;
    let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}.json`;

    const resp = await fetch(url, { method: 'PATCH', body: JSON.stringify({ status }) });
    const resultData = await resp.json();
    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('updateTask', { status });
  }
}