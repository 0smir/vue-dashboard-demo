<template>
  <div :class="['board__column', 'board__column--' + column.toLowerCase(), isColumnExpanded ? 'expanded' : 'collapsed']"
    :aria-expanded="isColumnExpanded ? true : false">
    <header class="board__column-header">
      <h3 class="board__column-title">{{ column }}</h3>
      <BaseButton class="btn btn__outlined btn--small btn--board-arrow" @click="isColumnExpanded = !isColumnExpanded">
        <SvgIcon v-if="!isColumnExpanded" name="chevron-down" class="icon" />
        <SvgIcon v-else name="chevron-up" class="icon" />
      </BaseButton>
    </header>
    <div v-show="isColumnExpanded" class="board__column-content">
      <TaskItem v-for="task in colTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue';
export default {
  components: {
    TaskItem
  },

  props: ['column', 'tasksList'],

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

  &__column-content {
    padding: 20px clamp(5px, 10px, 15px);
  }
}
</style>