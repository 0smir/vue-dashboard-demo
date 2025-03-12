<template>
  <BaseSpinner v-if="isLoading"></BaseSpinner>
  <div v-else class="page-container">
    <h1>{{ boardData.title }}</h1>
    <div class="board__controls-wrapper relative">
      <BaseButton v-if="isLoggedIn" @click="openDialog" class="btn btn__outlined btn--medium btn--light btn__add-task">
        <SvgIcon name="add" class="icon" />
        <span>Create task</span>
      </BaseButton>
      <BoardFilter @save-filter="updateBoardData" />
    </div>
    <Board v-if="filterParams.columns.length && filterParams.tasks" :columnsList="filterParams.columns" :tasksList="filterParams.tasks" />
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

  props: ['id'],

  data() {
    return {
      isLoading: false,
      error: null,
      addTaskDialogDisplay: false,
      taskPriorityList: this.$store.getters['tasks/getPriorityList'],
      filterParams: {
        columns: [],
        tasks: [],
        priority: [],
        people: []
      }
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    boardData() {
      return this.$store.getters['boards/getBoardData'];
    }
  },
  methods: {
    async loadBoardInfo(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('boards/loadBoardData', { id });
        if (this.boardData?.tasksList?.length) {
          await this.loadTasks(this.boardData.tasksList);
        }
      } catch (error) {
        this.error = error.message || 'faled to Fatch';
      }
      this.isLoading = false;
    },

    async loadTasks(taskIds) {
      try {
        const tasks = await Promise.all(
          taskIds.map(id => this.$store.dispatch('tasks/getTaskData', { id }))
        );
        this.filterParams.tasks = tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    updateBoardData(filterParams) {
      console.log('filterParams: ', filterParams);
      console.log('page updateBoardData');
      this.filterParams.columns = filterParams.selectedColumns;
      this.filterParams.people = filterParams.selectedPeople;
      this.filterParams.priority = filterParams.selectedPriorities;
    },

    openDialog() {
      this.addTaskDialogDisplay = true;
    },

    closeAddTaskDialog() {
      this.addTaskDialogDisplay = false;
    }
  },

  async created() {
    await this.loadBoardInfo(this.id);
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