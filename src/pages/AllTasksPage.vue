<template>
  <div class="container">
    <h2 class="title">All Tasks list</h2>
    <ul class="tasks-list__wrapper">
      <li class="tasks-list__item" v-for="task in tasks">
        <TaskItem :task="task" :key="task.id" />
      </li>
    </ul>

  </div>
</template>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue';
export default {
  components: {
    TaskItem
  },
  data() {
    return {
      tasks: this.$store.getters['tasks/getTasksList']
    }
  },
  methods: {
    async loadTasks(params) {
      try {
        await this.$store.dispatch('tasks/loadTasks');
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  },
  mounted() {
    this.loadTasks();
  }
}
</script>

<style lang="scss" scoped>
.tasks-list {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 20px;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width: 100%;

    @media (min-width: $sm) {
      width: calc(50% - 10px);
    }
  }
}
</style>