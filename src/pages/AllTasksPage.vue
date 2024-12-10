<template>
  <div class="container">
    <TasksFilter :filterItemsList="filterItemsList" :activeItem="activeFilter" @on-filter-change="filterNameChange" />
    <ul class="tasks-list__wrapper" v-if="tasks.length">
      <li class="tasks-list__item" v-for="task in tasks">
        <TaskItem :task="task" :key="task.id" />
      </li>
    </ul>
    <p v-else> No Items</p>
  </div>
</template>

<script>
import TasksFilter from '@/components/tasks/TasksFilter.vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
export default {
  components: {
    TasksFilter,
    TaskItem
  },
  data() {
    return {
      activeFilter: 'all',
      error: null
    }
  },
  computed: {
    filterItemsList() {
      return this.$store.getters['tasks/getStatusList'];
    },
    tasks() {
      return this.$store.getters['tasks/getTasksList'].filter((item) => {
        if (this.activeFilter === 'all') {
          return item;
        } else {
          return item.status === this.activeFilter;
        }
      });
    }
  },
  methods: {
    async loadTasks() {
      try {
        await this.$store.dispatch('tasks/loadTasks');
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    },
    filterNameChange(name) {
      this.activeFilter = name;
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
    column-gap: 10px;
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
      width: calc(100%/2 - 10px);
    }

    @media (min-width: $md) {
      width: calc(100%/3 - 10px);
    }

    @media (min-width: $tablet) {
      width: calc(100%/4 - 10px);
    }

  }
}
</style>