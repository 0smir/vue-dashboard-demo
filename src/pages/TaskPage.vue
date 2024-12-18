<template>
  <div v-if="taskInfo" class="task-info task-info__container">
    <div class="task-info__details">

      <div class="task-info__actions-wrapper">
        <SmartBox :list="taskStatusList" :title="taskStatus" mode="status"
          :classList="['btn', 'btn--medium', 'btn__outlined', 'task-info__btn-action', 'btn-action--status-updata']"
          @update-status="updateTaskStatus">
        </SmartBox>
        <SmartBox :list="taskActionsList" title="Actions" mode="actions"
          :classList="['btn', 'btn--medium', 'btn__outlined', 'task-info__btn-action', 'btn-action--action']">
        </SmartBox>
      </div>

      <div class="task-info__details-wrapper">
        <div class="task-details task-details--assignee" v-if="assigneeFullName">
          <span class="task-details__label task-details__label--assignee">Assignee:</span>
          <span class="task-details__value task-details__value--assignee"> {{ assigneeFullName }}</span>
        </div>
        <div class="task-details task-details--priority">
          <span class="task-details__label task-details__label--priority">Priority:</span>
          <span class="task-details__value task-details__value--priority">
            <TaskPriorityElement :priority="taskInfo.priority" :titleDisplay="true" />
          </span>
        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.project">
          <span class="task-details__label task-details__label--creator">Project: </span>
          <span class="task-details__value task-details__value--creator"> {{ taskInfo?.project }}</span>
        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.creator">
          <span class="task-details__label task-details__label--creator">Reporter: </span>
          <span class="task-details__value task-details__value--creator"> {{ creatorFullName }}</span>
        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.estimate">
          <span class="task-details__label task-details__label--creator">Time tracking: </span>
          <span class="task-details__value task-details__value--creator"> {{ taskInfo?.estimate }}</span>
        </div>
      </div>
    </div>

    <div class="task-info__task-data">
      <div class="task-info__main">
        <h1 class="task-info__title">{{ id }}: {{ taskInfo?.title }}</h1>
        <div class="task-info__descrioption-wrapper">
          <span class="task-info__label task-info__label--description">Description:</span>
          <div class="task-info__descrioption">
            <p class="text">{{ taskInfo?.description }}</p>
          </div>
        </div>
      </div>
      <div>
        comments
      </div>
    </div>
  </div>
  <p v-if="error">Error</p>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
export default {
  components: {
    TaskPriorityElement,
    SmartBox
  },
  props: ['id'],
  data() {
    return {
      taskStatusList: this.$store.getters['tasks/getStatusList'],
      taskActionsList: this.$store.getters['tasks/getTaskActionsList'],
      error: null
    }
  },
  computed: {
    taskInfo() {
      return this.$store.getters['tasks/getTaskInfo'];
    },
    taskStatus() {
      return this.taskInfo.status;
    },
    assigneeFullName() {
      let fullName = this?.taskInfo?.assignee.name + ' ' + this?.taskInfo?.assignee.lastName
      return fullName;
    },
    creatorFullName() {
      let fullName = this?.taskInfo?.creator.name + ' ' + this?.taskInfo?.creator.lastName
      return fullName;
    }
  },
  methods: {
    async getTaskData() {
      try {
        this.$store.dispatch('tasks/getTaskData', { id: this.id });
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    },
    updateTaskStatus(newStatus) {
      this.$store.dispatch('tasks/setTaskStatus', { ...this.taskInfo, status: newStatus });
    }
  },
  created() {
    this.getTaskData();
  }
}
</script>

<style lang="scss">
.task-info {
  &__container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: calc(100% - 30px);
    margin: 30px auto 0;

    @media (min-width: $md) {
      flex-direction: row;
    }
  }

  &__details {
    width: 100%;
    margin-bottom: 15px;

    @media (min-width: $md) {
      order: 5;
      max-width: calc(35% - 10px);
      padding: 10px 7px;
      border-left: 2px solid var(--color-secondary-light);
      min-height: 50vh;
    }
  }

  &__task-data {
    width: 100%;

    @media (min-width: $md) {
      padding-top: 25px;
      order: 1;
      max-width: calc(65% - 10px);
      min-height: 50vh;
    }
  }

  &__title {
    font-size: 2.4rem;
    margin: 0 0 10px;

    @media (min-width: $md) {
      font-size: 2.8rem;
      margin: 0 0 20px;
    }
  }

  &__descrioption {
    color: var(--color-tetriary);
    padding: 5px;
    margin-bottom: 20px;
  }

  &__label {
    font-size: 1.6rem;
    font-weight: 500;

    @media (min-width: $md) {
      font-size: 1.5rem;
      margin: 0 0 20px;
    }
  }

  &__actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__details-wrapper {
    padding: 10px 5px;
    border: 1px solid var(--color-secondary-light);
    border-radius: var(--border-radius-medium);
  }
}

.task-details {
  display: flex;
  margin-bottom: 10px;

  &__label {
    font-weight: 600;
    margin-right: 5px;
  }

  .task__priority {
    display: inline-flex;
    margin-right: 5px;
  }
}
</style>