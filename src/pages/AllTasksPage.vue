<template>
  <div v-if="isLoading === false" class="container">
    <div class="page__header flex">
       <h2 class="title">{{ $t("pages.tasks.all_tasks_title") }}</h2>
       <router-link to="/tasks/new" class="btn__link btn__default btn--medium btn__add-new-task">
        <SvgIcon name="add" class="icon icon--mediu" />
        {{ $t("common.new_task") }}</router-link>
    </div>
    <TasksFilter :filterItemsList="filterItemsList" :activeItem="activeFilter" @on-filter-change="filterNameChange" />
    <ul class="tasks-list__wrapper" v-if="tasks.length">
      <li class="tasks-list__item" v-for="task in tasks">
        <TaskItem :task="task" :key="task.id" type="grid-item" />
      </li>
    </ul>
    <p v-else>
      {{ $t("pages.tasks.no_items_with_status", {status: activeFilter}) }}
    </p>
  </div>
  <div v-else class="container container__spinner-wrapper">
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
  created() {
    this.loadTasks();
  }
}
</script>

<style lang="scss">
.page__header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .title {
    margin-bottom: 0;
  }
}

.btn__add-new-task {
  padding: 7px 15px;
  box-shadow: $main-shadow;
  text-transform: uppercase;

  .icon {
    margin-right: 5px;
  }
}

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