export default {
  async createProject(context, data) {
    const projectInfo = {
      id: data.id,
      title: data.title,
      description: data.description,
      owner: data.owner,
      members: [],
      boards: [],
      priority: data.priority,
      status: data.status
    }
    console.log('projectInfo', projectInfo);


    context.commit('addProject', { ...data });
  }

}