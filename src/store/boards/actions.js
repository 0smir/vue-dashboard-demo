const BASE_URL = 'https://jira-vue-demo-default-rtdb.firebaseio.com';

export default {
  async addBoard(context, data) {
    console.log(data);
    let boardInfo = {
      id: data.id,
      title: data.title,
      description: data.description,
      tasksList: data.tasksList
    };

    const resp = await fetch(`https://jira-vue-demo-default-rtdb.firebaseio.com/boardsList/${boardInfo.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(boardInfo)
      }
    );

    const respData = await resp.json();
    if (!resp.ok) {
      const error = new Error(respData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit(addBoard, boardInfo);
  },
  async loadBoardData(context, data) {
    let boardID = data.id,
      url = `${BASE_URL}/boardsList/${boardID}.json`;

    let resp = await fetch(url);
    let respData = await resp.json();

    if (!resp.ok) {
      const error = new Error(respData.message || 'failed to fetch');
      throw error;
    }

    context.commit('setBoard', { ...respData });
    return respData;
  },

  async LoadAllBoardsData(context) {
    let url = `${BASE_URL}/boardsList.json`;

    let resp = await fetch(url);
    let response = await resp.json();

    if (!resp.ok) {
      const error = new Error(response.message || 'failed to fetch LoadAllBoardsData');
      throw error;
    }
    let boardsList = [];
    for (let key in response) {
      let board = {
        id: key,
        title: response[key].title,
        description: response[key].description,
        tasksList: response[key]?.tasksList || []
      };
      boardsList.push(board);
    }
    context.commit("setBoardsList", boardsList);
    return response;
  },

  async addTaskToBoard(context, data) {
    let { boardID, taskID } = data,
      url = `${BASE_URL}/boardsList/${boardID}/tasksList.json`;

    let resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(taskID)
    });
    let response = await resp.json();

    if (!resp.ok) {
      const error = new Error(response.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('addTaskToBoard', data);
  },

  async editBoardInfo(context, data) {
    let { boardID, property, newValue } = data,
      url = `${BASE_URL}/boardsList/${boardID}.json`,
      boardInfo = {};
    boardInfo[property] = newValue;

    let resp = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(boardInfo)
    });
    let response = await resp.json();

    if (!resp.ok) {
      const error = new Error(response.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('updateBoardInfo', { property, newValue });
  },

  setToBoardTasksList(context, data) {
    context.commit('updateBoardTasksList', data);
  },

  clearToBoardTasksList(context, data) {
    context.commit('resetBoardTasksList', data);
  },

  setBoardColumns(context, data) {
    context.commit('updateBoardFilter', ...data);
  },
  setBoardFilter(context, data) {
    let params = data.params;
    context.commit('setBoardFilterParams', { boardId: data.boardId, params });
  }

}