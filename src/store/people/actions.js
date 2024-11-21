export default {
  async loadEmployeesList(context, data) {
    const url = `https://jira-vue-demo-default-rtdb.firebaseio.com/people.json`;

    const resp = await fetch(url);
    const responseData = await resp.json();

    if (!resp.ok) {
      const error = new Error(resp.message || 'Fetch failed');
      throw error;
    }

    let employeesList = [];

    for (const key in responseData) {
      const person = {
        id: key,
        name: responseData[key].name,
        lastName: responseData[key].lastName,
        position: responseData[key].position,
        project: responseData[key].project
      };
      employeesList.push(person);
    }
    console.log(employeesList);
    context.commit('setEmployees', ...employeesList);
  },

  async addEmployee(context, data) {
    const person = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      position: data.position,
      project: data.project
    };
    const url = `https://jira-vue-demo-default-rtdb.firebaseio.com/people/${person.id}.json`;

    const resp = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(person)
    });
    if (!resp.ok) {
      const error = new Error(resp.message || 'Fetch failed');
      throw error;
    }

    context.commit('addEmployee', person);
  }
}