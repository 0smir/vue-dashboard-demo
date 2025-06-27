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

  addTaskToBoard(context, data) {
    //add task to board
  },

  setToBoardTasksList(context, data) {
    console.log(data);
    context.commit('updateBoardTasksList', data);
  },

  setBoardColumns(context, data) {
    context.commit('updateBoardFilter', ...data);
  },
  setBoardFilter(context, data) {
    let params = data.params;
    context.commit('setBoardFilterParams', { boardId: data.boardId, params });
  }

}