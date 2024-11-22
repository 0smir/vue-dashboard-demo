export default {
  setBoardColumns(context, data) {
    context.commit('updateBoardFilter', data);
  }

}