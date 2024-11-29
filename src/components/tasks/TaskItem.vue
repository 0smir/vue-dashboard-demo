<template>
  <div :class="['task', 'task__status--' + task.status.toLowerCase()]">
    <BaseButton class="btn btn__outlined btn--small task__btn-edit" title="edit" aria-label="edit task">
      <SvgIcon name="edit" class="icon" />
    </BaseButton>
    <h2 class="task__title">{{ task.title }}</h2>
    <div class="task__description">
      {{ task.description }}
    </div>
    <div class="task__info">
      <span class="task__info-id">
        <span :class="['task__priority', 'priority--' + task.priority]">
          <SvgIcon :name="task.priority" iconType="priority" class="icon--medium" />
        </span>
        <span class="task-id">{{ task.id }}</span>
      </span>
      <span v-if="task.assignee" class="task__info-assignee rounded" :title="task.assignee.name">
        <span v-if="!task.assignee.img">{{ getNameInitials() }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    taskStatusStyle() {
      return 'task-status--' + this.task.status.toLowerCase();
    }
  },
  methods: {
    getNameInitials() {
      let arr = this.task.assignee.name.split(' '),
        initialsArray = arr.map((item) => item.charAt(0)),
        initialsStr = initialsArray.join('');

      return initialsStr;
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
    padding-top: 10px;
    margin-top: 10px;
    border-top: 2px solid var(--task-border);
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
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__btn-edit {
    position: absolute;
    top: 7px;
    right: 10px;

    &>.icon {
      width: 20px;
      height: 20px;
    }
  }

  &__priority {
    display: flex;
    justify-content: center;
    padding: 2px;
    margin-right: 4px;
    border-radius: var(--border-radius-small);
    color: var(--color-white);
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