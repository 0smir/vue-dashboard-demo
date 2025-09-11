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
      reporter: data.reporter,
      estimateTime: data.estimation,
      loggedTime: 0,
      createdTime: data.createdTime,
      updateTime: 0,
      comments: [],
      taskUpdatesHistory: []
    };

    const resp = await fetch(
      `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${taskInfo.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(taskInfo)
      }
    );
    const resultData = await resp.json();

    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    } else if (data.boardID) {
      context.dispatch('boards/addTaskToBoard', { taskID: taskInfo.id, boardID: data.boardID }, { root: true });
    }

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
        reporter: resultData[key].reporter,
        createdTime: resultData[key].createdTime,
        estimateTime: resultData[key].estimateTime,
        loggedTime: resultData[key].loggedTime,
        updateTime: resultData[key].updateTime,
        comments: resultData[key].comments,
        taskUpdatesHistory: resultData[key].taskUpdatesHistory
      };
      taskList.push(task);
    }
    localStorage.setItem('tasksList', JSON.stringify(taskList));
    context.commit('setTasks', taskList);
  },

  async getTaskData(context, data) {
    let taskID = data.id,
      action = data.action,
      url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${taskID}.json`;

    const resp = await fetch(url);
    const resultData = await resp.json();
    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    if (!action) {
      context.commit('setTask', { ...resultData });
    } else {
      context.dispatch(action, resultData, { root: true });
    }
  },

  async LogTime(context, data) {
    let { id, mode, loggedTimeDescription, loggedTimeDate, spentTime, loggedTime } = data;
    let updateTime = new Date().getTime();

    let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}.json`;
    const resp = await fetch(url, {
      method: 'PATCH', body: JSON.stringify({
        loggedTime,
        updateTime
      })
    });
    const resultData = await resp.json();

    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('updateTask', { loggedTime, updateTime });
    context.dispatch('updateTaskHistory', {
      id,
      mode,
      updateTime,
      newValue: { loggedTimeDate, loggedTimeDescription, spentTime }
    })
  },

  async updateTask(context, data) {
    let { id, mode } = data,
      url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}.json`,
      updateTime = new Date().getTime(),
      changedTaskData = null;

    switch (mode) {
      case 'status': {
        changedTaskData = { status: data.status, updateTime: updateTime };
        break;
      }
      case 'priority': {
        changedTaskData = { priority: data.priority, updateTime: updateTime };
        break;
      }
      case 'project': {
        changedTaskData = { project: data.project, updateTime: updateTime };
        break;
      }
      case 'assignee': {
        changedTaskData = { assignee: data.assignee, updateTime: updateTime };
        break;
      }
      case 'reporter': {
        changedTaskData = { reporter: data.reporter, updateTime: updateTime };
        break;
      }
    };

    if (!changedTaskData) return;

    const resp = await fetch(url, { method: 'PATCH', body: JSON.stringify(changedTaskData) });
    const resultData = await resp.json();
    if (!resp.ok) {
      const error = new Error(resultData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('updateTask', changedTaskData);
    await context.dispatch('updateTaskHistory', { id, mode, updateTime, newValue: changedTaskData[mode] });
  },

  async removeTask(context, data) {
    let { id } = data;
    let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}.json`;
    const resp = await fetch(url, { method: 'DELETE' });
    const respData = await resp.json();

    if (!resp.ok) {
      const error = new Error(respData.message || 'faled to fetch!');
      throw error;
    }
    context.commit('removeTask', { id });
  },

  async AddComment(context, data) {
    let { id, mode, authorID, commentText } = data,
      updateTime = new Date().getTime();

    context.dispatch('updateTaskHistory', {
      id,
      mode,
      updateTime,
      newValue: { authorID, commentText }
    });
  },

  async updateTaskHistory(context, data) {
    let { id, mode, updateTime } = data;
    let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}/taskUpdatesHistory.json`;
    let changesAuthor = context.rootGetters['users/userID'];

    let historyUpdatesData = {
      authorID: changesAuthor,
      updateTime: updateTime,
      mode,
      newValue: data.newValue
    };

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(historyUpdatesData)
    });
    const respData = await resp.json();

    if (!resp.ok) {
      const error = new Error(respData.message || 'Failed to fetch updateTaskHistory');
      throw error;
    }

    context.commit('updateTaskHistory', { key: respData.name, historyUpdatesData });
  }
}