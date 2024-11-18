<template>
  <div :class="['task-item', task.status.toLowerCase()]">

    <h2 class="task__title">{{ task.title }}</h2>
    <div class="task__description">
      {{ task.description }}
    </div>
    <BaseButton class="btn btn--small task__btn-edit" title="edit" aria-label="edit task">
      <SvgIcon name="edit" class="icon" />
    </BaseButton>
    <div class="task__info">
      <span class="task__info-id">
        <span :class="['task__priority', 'priority--' + task.priority]">
          <SvgIcon :name="task.priority" iconType="priority" class="icon--medium" />
        </span>
        <span class="task-id">{{ task.id }}</span>
      </span>
      <span v-if="task.assignee" class="task__info-assignee rounded" title="{{ task.assignee.name }}">
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
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #fff;
  }

  &__title {
    font-size: 22px;
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
    margin-left: auto;
  }

  &__priority {
    display: flex;
    justify-content: center;
    padding: 2px 1px;
    margin-right: 4px;
    border-radius: var(--border-radius-small);
  }

  &__info-assignee {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border: 3px solid #fff;
    font-size: 18px;
    background-color: var(--color-testing);
    font-weight: 300;
    padding-top: 1px;
  }

  &__info-id {
    display: flex;
    align-items: center;

    .task-id {
      margin-top: 4px;
      font-size: 14px;
    }

  }
}

.task-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 8px;
  border-left: 4px solid;
  background-color: var(--color-dark-bg);

  &.todo {
    border-color: var(--color-todo);
  }

  &.inprogress {
    border-color: var(--color-inprogress);
  }

  &.inreview {
    border-color: var(--color-inreview);
  }

  &.testing {
    border-color: var(--color-testing);
  }

  &.done {
    border-color: var(--color-done);
  }

  &.blocked {
    border-color: var(--color-blocked);
  }
}
</style>