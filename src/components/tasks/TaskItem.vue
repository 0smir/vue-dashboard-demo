<template>
  <div :class="['task', 'task__status--' + task.status.toLowerCase()]">
    <div class="task__info">
      <span class="task__info-id">
        <TaskPriorityElement :priority="task.priority" />
        <span class="task-id">{{ task.id }}</span>
      </span>
      <span v-if="task.assignee" class="task__info-assignee rounded" :title="task.assignee.name">
        <span v-if="!task.assignee.img">{{ getNameInitials() }}</span>
      </span>
    </div>

    <h2 class="task__title">{{ task.title }}</h2>
    <div class="task__description">
      {{ task.description }}
    </div>
    <BaseButton v-if="type === 'column-item'" class="btn btn__outlined btn--small task__btn-edit" title="edit"
      aria-label="edit task">
      <SvgIcon name="edit" class="icon" />
    </BaseButton>
    <RouterLink v-else :to="TaskLink" class="btn btn__outlined btn--small">See task details</RouterLink>
  </div>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
export default {
  components: {
    TaskPriorityElement
  },
  props: ['task', 'type'],
  computed: {
    TaskLink() {
      return this.$route.path + '/' + this.task.id;
    }
  },
  methods: {
    getNameInitials() {
      return this.task.assignee.name.charAt(0) + this.task.assignee.lastName.charAt(0);
    }
  }

}
</script>

<style lang="scss" scoped>
.task {
  --task-border: var(--color-secondary-medium);
  --task-text-color: var(--color-secondary);

  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid var(--task-border);
  border-left: 4px solid;
  color: var(--task-text-color);
  background-color: #fff;

  &:last-of-type {
    margin-bottom: 0;
  }


  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid var(--task-border);
  }

  &__title {
    margin-bottom: 12px;
    padding-right: 40px;
    font-size: 18px;
    font-weight: 500;
  }

  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__btn-edit {
    max-width: 35px;
    margin-left: auto;

    &>.icon {
      width: 20px;
      height: 20px;
    }
  }

  :deep(.priority__wrapper) {
    margin-right: 4px;
  }

  &__info-assignee {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border: 2px solid var(--task-border);
    font-size: 18px;
    background-color: var(--color-primary-light);
    font-weight: 300;
    padding: 2px;
  }

  &__info-id {
    display: flex;
    align-items: center;

    .task-id {
      margin-top: 4px;
      font-size: 14px;
    }

  }

  &__status {

    &--todo {
      border-left-color: var(--color-todo);
    }

    &--inprogress {
      border-left-color: var(--color-inprogress);
    }

    &--inreview {
      border-left-color: var(--color-inreview);
    }

    &--testing {
      border-left-color: var(--color-testing);
    }

    &--done {
      border-left-color: var(--color-done);
    }

    &--blocked {
      border-left-color: var(--color-blocked);
    }
  }
}
</style>