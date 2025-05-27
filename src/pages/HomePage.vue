<template>
  <div class="page-container">
    <h1>Main Board</h1>
    <div class="board__controls-wrapper relative">
      <BaseButton v-if="isLoggedIn" @click="openDialog" class="btn btn__outlined btn--medium btn--light btn__add-task">
        <SvgIcon name="add" class="icon" />
        <span>Create task</span>
      </BaseButton>
      <BoardFilter @save-filter="displayColumns" />
    </div>

    <Board v-if="columnsToDisplay.length" :columnsList="columnsToDisplay" :tasksList="tasks" />
    <p v-else>Choose some filter points to display tasks</p>
    <BaseDialog :show="addTaskDialogDisplay" title="New Task" @close="closeAddTaskDialog">
      <CreateTaskForm className="dialog" mode="dialog"></CreateTaskForm>
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
      taskPriorityList: this.$store.getters['tasks/getPriorityList'],
      columnsToDisplay: this.$store.getters['boards/getDefaultBoardColumns'],
      addTaskDialogDisplay: false,
      error: null,
      isLoading: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    tasks() {
      return this.$store.getters['tasks/getTasksList'];
    },
    peopleList() {
      return this.$store.getters['people/getEmployeesList'];
    },
    boardColumns() {
      this.$store.getters['boards/getBoardColumns'];
    },
  },
  methods: {
    displayColumns(columnsList) {
      this.columnsToDisplay = columnsList;
    },
    updateBoardData(filterParams) {
      let { columns, people, priorities } = filterParams;
      console.log('columns: ', columns);
      console.log('people: ', people);
      console.log('priorities: ', priorities);
      console.log('page updateBoardData');
    },
    openDialog() {
      this.addTaskDialogDisplay = true;
    },
    closeAddTaskDialog() {
      this.addTaskDialogDisplay = false;
    },
    async loadTasks() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('tasks/loadTasks');
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    },
    async loadUsersList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('people/loadEmployeesList');
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  },
  mounted() {
    this.loadTasks();
    this.loadUsersList();
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