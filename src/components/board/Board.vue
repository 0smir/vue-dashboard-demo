<template>
  <div class="board">
    <div v-for="column in columnsList" :class="['board_column', 'board_column--' + column.toLowerCase()]"
      :style="boardColumnWidth">
      <header class="board_column-header">
        <h3>{{ column }}</h3>
      </header>
      <div class="board_column-content">
        <div class="task-wrapper" v-for="task in tasksList">
          <TaskItem v-if="column === task.status" :key="task.id" :id="task.id" :title="task.title"
            :description="task.description" :status="task.status" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue';
export default {
  props: ['columnsList', 'tasksList'],
  components: {
    TaskItem
  },

  computed: {
    boardColumnWidth() {
      let width = (100 / this.columnsList.length) + '%';
      let colWidth = `width: calc( ${width} - 10px)`;
      return colWidth;
    }
  },

}
</script>

<style lang="scss" scoped>
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
</style>