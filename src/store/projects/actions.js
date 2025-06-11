const BASE_URL = 'https://jira-vue-demo-default-rtdb.firebaseio.com';

export default {
  async createProject(context, data) {
    const projectInfo = {
      id: data.id,
      title: data.title,
      description: data.description,
      owner: data.owner,
      members: data.members,
      boards: [],
      priority: data.priority,
      status: data.status
    }
    console.log('projectInfo', projectInfo);
    const resp = await fetch(`https://jira-vue-demo-default-rtdb.firebaseio.com/projectsList/${projectInfo.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(projectInfo)
      }
    );

    const respData = await resp.json();
    if (!resp.ok) {
      const error = new Error(respData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('addProject', { ...projectInfo });
  },

  async loadProjectData(context, data) {
    let projectID = data.id,
      url = `${BASE_URL}/projectsList/${projectID}.json`;

    let resp = await fetch(url);
    let respData = await resp.json();

    if (!resp.ok) {
      const error = new Error(respData.message || 'failed to fetch');
      throw error;
    }

    context.commit('setProject', { ...respData });
  },
  async loadAllProjectsData(context, data) {
    let url = `${BASE_URL}/projectsList.json`;

    let resp = await fetch(url);
    let respData = await resp.json();

    if (!resp.ok) {
      const error = new Error(respData.message || 'failed to fetch');
      throw error;
    }

    context.commit('setProjectsList', respData);
  }

}