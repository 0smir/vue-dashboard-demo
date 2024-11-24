<template>
  <div class="page-container">
    <h1>Main Board</h1>
    <div class="board__controls-wrapper relative">
      <BaseButton @click="openDialog" class="btn btn__outlined btn--medium btn--light btn__add-task">
        <SvgIcon name="add" class="icon" />
        <span>Create task</span>
      </BaseButton>
      <BoardFilter @save-filter="displayColumns" />
    </div>

    <Board v-if="columnsToDisplay.length" :columnsList="columnsToDisplay" :tasksList="tasks" />
    <p v-else>Choose some filter points to display tasks</p>
    <BaseDialog :show="addTaskDialogDisplay" title="New Task" @close="closeAddTaskDialog">
      <CreateTaskForm></CreateTaskForm>
    </BaseDialog>
  </div>
</template>

<script>
import BoardFilter from '@/components/board/BoardFilter.vue';
import Board from '@/components/board/Board.vue';
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';

export default {
  components: {
    BoardFilter,
    Board,
    CreateTaskForm
  },
  data() {
    return {
      tasks: this.$store.getters['tasks/getTasksList'],
      taskPriorityList: this.$store.getters['tasks/getPriorityList'],
      columnsToDisplay: this.$store.getters['boards/getDefaultBoardColumns'],
      addTaskDialogDisplay: false
    }
  },

  methods: {
    displayColumns(columnsList) {
      this.columnsToDisplay = columnsList;
    },
    openDialog() {
      this.addTaskDialogDisplay = true;
    },
    closeAddTaskDialog() {
      this.addTaskDialogDisplay = false;
    },
    async loadTasks(params) {
      try {
        await this.$store.dispatch('tasks/loadTasks');
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  },
  mounted() {
    this.loadTasks();
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
}

.btn__add-task {
  position: absolute;
  right: 0;
  top: -5px;

  span {
    margin-left: 7px;
  }
}
</style>