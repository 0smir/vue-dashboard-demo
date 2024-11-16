<template>
  <div class="page-container">
    <h1>Main Board</h1>
    <BoardFilter @save-filter="displayColumns"></BoardFilter>
    <div>
      <BaseButton @click="openDialog">+ Create task</BaseButton>
    </div>
    <p v-if="!columnsToDisplay.length">Choose some filter points to display tasks</p>
    <Board v-else :columnsList="columnsToDisplay" :tasksList="tasks" />
    <BaseDialog :show="addTaskDialogDisplay" title="New Task" @close="closeAddTaskDialog">
      <CreateTaskForm></CreateTaskForm>
    </BaseDialog>
  </div>
</template>

<script>
import BoardFilter from '@/components/board/BoardFilter.vue';
import Board from '@/components/board/Board.vue';
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';
import { computed } from 'vue';
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
      console.log(columnsList);
      this.columnsToDisplay = columnsList;
    },
    openDialog() {
      this.addTaskDialogDisplay = true;
    },
    closeAddTaskDialog() {
      this.addTaskDialogDisplay = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>