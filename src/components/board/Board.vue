<template>
  <div class="board">
    <div v-for="column in columnsList" :class="['board__column', 'board__column--' + column.toLowerCase()]"
      :style="boardColumnWidth">
      <header class="board__column-header">
        <h3 class="board__column-title">{{ column }}</h3>
      </header>
      <div class="board__column-content">
        <div class="task-wrapper" v-for="task in tasksList">
          <TaskItem v-if="column === task.status" :key="task.id" :task="task" />
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
.board {
  --board-header-bg: var(--color-tetriary-light);
  --board-header-border: var(--color-secondary-light);
  --board-header-text-color: var(--color-secondary);
  --board-header-border-radius: var(--border-radius-medium);

  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  margin: 20px 0;

  &__column {
    flex-direction: column;
    width: max(33%);
  }

  &__column-content {
    padding: 20px clamp(5px, 10px, 15px);
  }

  &__column-title {
    font-size: 20px;
  }

  &__column-header {
    padding: 8px 25px;
    background-color: var(--board-header-bg);
    border: 2px solid var(--board-header-border);
    color: var(--board-header-text-color);
    border-radius: var(--board-header-border-radius);
  }
}

.task-wrapper {
  margin-bottom: 10px;
}
</style>