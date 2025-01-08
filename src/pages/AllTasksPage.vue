<template>
  <div v-if="isLoading === false" class="container">
    <TasksFilter :filterItemsList="filterItemsList" :activeItem="activeFilter" @on-filter-change="filterNameChange" />
    <ul class="tasks-list__wrapper" v-if="tasks.length">
      <li class="tasks-list__item" v-for="task in tasks">
        <TaskItem :task="task" :key="task.id" type="grid-item" />
      </li>
    </ul>
    <p v-else>
      No items with task status {{ activeFilter }}
    </p>
  </div>
  <div v-else class="container">
    <BaseSpinner />
  </div>
</template>

<script>
import TasksFilter from '@/components/tasks/TasksFilter.vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
export default {
  components: {
    TasksFilter,
    TaskItem
  },
  data() {
    return {
      isLoading: false,
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
      this.isLoading = true;
      try {
        await this.$store.dispatch('tasks/loadTasks');
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
      this.isLoading = false;
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