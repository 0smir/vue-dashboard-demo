<template>
  <BaseSpinner v-if="isLoading"></BaseSpinner>
  <div v-else class="page-container">
    <h1>{{ boardData.title }}</h1>
    <div class="board__controls-wrapper relative">
      <BaseButton v-if="isLoggedIn" @click="openDialog" class="btn btn__outlined btn--medium btn--light btn__add-task">
        <SvgIcon name="add" class="icon" />
        <span>Create task</span>
      </BaseButton>
      <BoardFilter :boardId="id" :filterData="filterParams"  @save-filter="updateBoardData" />
    </div>
    <Board v-if="filterParams.columns.length && boardTasks.length" :columnsList="filterParams.columns" :tasksList="tasksListFiltered" />
    <p v-if="boardTasks.length && !filterParams.columns.length && !filterParams.priority.length && !filterParams.people.length">Choose some filter points to display tasks</p>
    <p v-if="!boardTasks.length">No task to display</p>
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
      taskPriorityList: this.$store.getters['tasks/getPriorityList']
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    boardData() {
      return this.$store.getters['boards/getBoardData'];
    },
    filterInfo() {
      return this.$store.getters['boards/getBoardFilterParms']
    },
    filterParams() {
      return {
        columns: this.filterInfo.columns,
        priority: this.filterInfo.priority,
        people: this.filterInfo.people
      };
    },
    boardTasks() {
      return this.$store.getters['boards/getBoardTasksList'];
    },
    tasksListFiltered() {
      return this.boardTasks.filter((task) => {
        return (
          (!this.filterParams.priority.length || this.filterParams.priority.some((p) => task.priority.includes(p))) &&
          (!this.filterParams.columns.length || this.filterParams.columns.some((s) => task.status.includes(s))) &&
          (!this.filterParams.people.length || this.filterParams.people.some((e) => task.assignee.id.includes(e.id)))
        );
      }); 
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
        await Promise.all(
          taskIds.map(id => {
            this.$store.dispatch('tasks/getTaskData', { id, action: 'boards/setToBoardTasksList' }, { root: true });
          })
        );
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    updateBoardData(filterParams) {
      let params = {
        columns: filterParams.selectedColumns,
        people:  filterParams.selectedPeople,
        priority:  filterParams.selectedPriorities
      };

      this.$store.dispatch('boards/setBoardFilter', { boardId: this.id, params });
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