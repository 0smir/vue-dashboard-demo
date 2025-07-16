<template>
  <BaseSpinner v-if="isLoading"></BaseSpinner>
  <div v-else class="page-container board__page-container">
    <BoardProjectInfoComponent :project="boardData?.project" 
                              @update-board="updateBoard"
    />
    <BoardTitleComponennt :title="boardData.title"
                          :id="id"
                          @update-board="updateBoard"
    />
    <div class="board__controls-wrapper relative">
      <BaseButton v-if="isLoggedIn" @click="openDialog" class="btn btn__outlined btn--medium btn--light btn__add-task">
        <SvgIcon name="add" class="icon" />
        <span>Create task</span>
      </BaseButton>
      <BoardFilter :boardId="id" :filterData="filterParams" @save-filter="updateBoardData" />
    </div>
    <Board v-if="filterParams.columns.length && boardTasks.length" :columnsList="filterParams.columns"
      :tasksList="tasksListFiltered" />
    <p
      v-if="boardTasks.length && !filterParams.columns.length && !filterParams.priority.length && !filterParams.people.length">
      Choose some filter points to display tasks</p>
    <p v-if="!boardTasks.length">No task to display</p>
    <BaseDialog :show="addTaskDialogDisplay" title="New Task" @close="closeAddTaskDialog">
      <CreateTaskForm className="dialog" mode="dialog" :userID="userInfo.id"></CreateTaskForm>
    </BaseDialog>
  </div>
</template>

<script>
import BoardFilter from '@/components/board/BoardFilter.vue';
import Board from '@/components/board/Board.vue';
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';
import BoardTitleComponennt from '@/components/board/BoardTitleComponent.vue';
import BoardProjectInfoComponent from '@/components/board/BoardProjectInfoComponent.vue';
import BoardProjectEdit from '@/components/board/BoardProjectEdit.vue';

export default {
  components: {
    BoardFilter,
    Board,
    CreateTaskForm,
    BoardTitleComponennt,
    BoardProjectInfoComponent,
    BoardProjectEdit
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
    userInfo() {
      return this.$store.getters['users/getUserInfo'];
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
        let boardTasksList = this.boardData?.tasksList;

        if (!boardTasksList) {
          return this.updateBoardTasksList([]);
        }
       
        if (this.boardData?.tasksList?.length && !this.boardTasks.length) {
          await this.loadTasks(this.boardData.tasksList);
        }
      } catch (error) {
        this.error = error.message || 'faled to Fatch';
      }finally{
         this.isLoading = false;
      }
    },

    async loadTasks(taskIds) {
      if (!taskIds.length) {
        return this.updateBoardTasksList([]);
      }
      try {
        let tasksArr = [];
        let promises = taskIds.map(id => {
          let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/tasksList/${id}.json`;
          return fetch(url).then(response => response.json()); 
        });
        
        await Promise.allSettled(promises).then((results) => {
          return results.forEach((result) => {
            if (result.status === 'fulfilled') {
              tasksArr.push(result.value);
            } else {
              console.error(`Failed to load task ${taskIds[index]}:`, result.reason);
            }
          });
        });
        this.updateBoardTasksList(tasksArr);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    updateBoardTasksList(tasks = []) {
      this.$store.dispatch('boards/setToBoardTasksList', {
        boardId: this.id,
        tasksList: tasks
      });
    },

    updateBoardData(filterParams) {
      let params = {
        columns: filterParams.selectedColumns,
        people: filterParams.selectedPeople,
        priority: filterParams.selectedPriorities
      };

      this.$store.dispatch('boards/setBoardFilter', { boardId: this.id, params });
    },

    async updateBoard(options){     
      let data = {
        boardID: this.id,
        property: options.type,
        newValue: options.newValue
      }
      try{
        await this.$store.dispatch('boards/editBoardInfo', data);
      }catch(error){
        this.error = error.message || "failed to fetch";
      }
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

}
.board {
  &__page-container{
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 15px 15px;
  }
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