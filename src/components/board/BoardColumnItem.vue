<template>
  <div
    :class="['board__column', 'board__column--' + column.toLowerCase(), isColumnExpanded ? 'expanded' : 'collapsed', 'column-width-' + columnsCount]"
    :aria-expanded="isColumnExpanded ? true : false">
    <header class="board__column-header">
      <h3 class="board__column-title">
        <span>{{ column }}</span>
        <span v-if="colTasks.length" class="board__column-task-count">{{ colTasks.length }}</span>
      </h3>
      <BaseButton class="btn btn__outlined btn--small btn--board-arrow" @click="isColumnExpanded = !isColumnExpanded">
        <SvgIcon v-if="!isColumnExpanded" name="chevron-down" class="icon" />
        <SvgIcon v-else name="chevron-up" class="icon" />
      </BaseButton>
    </header>
    <div v-show="isColumnExpanded" class="board__column-content">
      <TaskItem v-for="task in colTasks" :key="task.id" :task="task" type="column-item" />
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue';
export default {
  components: {
    TaskItem
  },

  props: ['column', 'tasksList', 'columnsCount'],

  data() {
    return {
      isColumnExpanded: (window.innerWidth >= 769) ? true : false
    }
  },
  computed: {
    colTasks() {
      // isColumnExpanded: (window.width >= 769) ? true : false
      var tasks = this.tasksList.filter((item) => item.status === this.column);
      return tasks;
    }
  },
  created() { }

}
</script>

<style lang="scss" scoped>
.btn--board-arrow {
  display: block;

  @media (min-width: $md) {
    display: none;
  }
}

.board {

  &__column-title {
    font-size: 20px;
  }

  &__column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 25px;
    background-color: var(--board-header-bg);
    border: 2px solid var(--board-header-border);
    color: var(--board-header-text-color);
    border-radius: var(--board-header-border-radius);

    &:hover {
      background-color: var(--board-header-border);
      border: 2px solid var(--board-header-border-hovered);
    }
  }

  &__column-task-count {
    margin-left: 15px;
    font-size: 75%;
    color: var(--);
  }

  &__column-content {
    padding: 20px clamp(5px, 10px, 15px);
  }
}

.column-width-1 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/1) - 5px);
  }
}

.column-width-2 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/2) - 5px);
  }
}

.column-width-3 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/3) - 5px);
  }
}

.column-width-4 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/4) - 5px);
  }
}

.column-width-5 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/5) - 5px);
  }
}

.column-width-6 {
  width: 100%;

  @media (min-width: $md) {
    width: calc((100%/6) - 5px);
  }
}
</style>