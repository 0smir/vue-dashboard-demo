<template>
  <div class="page-container">
    <h1>Main Board</h1>
    <BoardFilter @save-filter="displayColumns"></BoardFilter>
    <div>
      <BaseButton @click="openDialog">+ Create task</BaseButton>
    </div>
    <p v-if="!columnsToDisplay.length">Choose some filter points to display tasks</p>
    <div v-else class="board">
      <div v-for="column in columnsToDisplay" :class="['board_column', 'board_column--' + column.toLowerCase()]"
        :style="boardColumnWidth">
        <header class="board_column-header">
          <h3>{{ column }}</h3>
        </header>
        <div class="board_column-content">
          <div class="task-wrapper" v-for="task in tasks">
            <TaskItem v-if="column === task.status" :key="task.id" :id="task.id" :title="task.title"
              :description="task.description" :status="task.status" />
          </div>

        </div>
      </div>
    </div>

    <BaseDialog :show="addTaskDialogDisplay" title="New Task" @close="closeAddTaskDialog">
      <CreateTaskForm></CreateTaskForm>
    </BaseDialog>
  </div>
</template>

<script>
import BoardFilter from '@/components/board/BoardFilter.vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';

export default {
  components: {
    TaskItem,
    BoardFilter,
    CreateTaskForm
  },
  data() {
    return {
      tasks: [],
      taskPriorityList: this.$store.getters['tasks/getPriorityList'],
      taskStatusList: this.$store.getters['tasks/getStatusList'],
      columnsToDisplay: [],
      defaultBoardCollumns: ['toDo', 'inProgress', 'Done'],
      addTaskDialogDisplay: false
    }
  },

  provide() {
    return {
      taskStatuses: this.taskStatusList,
      defaultBoardCollumns: this.defaultBoardCollumns
    }
  },

  computed: {
    boardColumnWidth() {
      let width = (100 / this.columnsToDisplay.length) + '%';
      let colWidth = `width: calc( ${width} - 10px)`;
      return colWidth;
    },
    toDoList() {
      let toDoItems = this.tasks.filter((task) => task.status === 'toDo');
      return toDoItems;
    },
    inProgressList() {
      let inProgressItems = this.tasks.filter((task) => task.status === 'inProgress');
      return inProgressItems;
    },
    doneList() {
      let doneItems = this.tasks.filter((task) => task.status === 'done');
      return doneItems;
    }
  },

  methods: {
    displayColumns(columnsList) {
      console.log(columnsList);
      this.columnsToDisplay = columnsList;
    },
    getTasks() {
      this.tasks = this.$store.getters['tasks/getTasksList'];
    },
    openDialog() {
      this.addTaskDialogDisplay = true;
    },
    closeAddTaskDialog() {
      this.addTaskDialogDisplay = false;
    }
  },
  created() {
    this.getTasks();
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  // min-width: calc(100% - 200px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
}

.board,
.board_column {
  display: flex;
  border-radius: 5px;
}

.board {
  justify-content: space-between;
  padding: 0 10px 10px;
  margin: 20px 0;
  background-color: #46546f;

}

.board_column-header {
  padding: 15px;
  background-color: #46546f;
  text-align: center;
}

.task-wrapper {
  margin-bottom: 10px;
}

.board_column {
  flex-direction: column;
  width: max(33%);
  background-color: #5c6786;
}

.board_column-content {
  padding: 20px clamp(5px, 15px, 15px);
}

.board_column--todo {
  order: 1;
}

.board_column--inprogress {
  order: 2;
}

.board_column--inreview {
  order: 3;
}

.board_column--testing {
  order: 4;
}

.board_column--done {
  order: 5;
}

.board_column--blocked {
  order: 6;
}
</style>