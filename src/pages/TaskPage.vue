<template>
  <div v-if="taskInfo" class="container task-data task-data__wrapper">
    <div class="task-details">
      <div class="task-details__creator">
        <span class="task-details--label">Creator: </span>
        <span class="task-details--value"> {{ taskInfo?.creator }}</span>
      </div>
      <div class="task-details__assignee">
        <span class="task-details--label">Assignee:</span>
        <span class="task-details--value"> {{ assigneeFullName }}</span>
      </div>
      <div class="task-details__priority">
        <span class="task-details--label">Priority:</span>
        <span class="task-details--value"> {{ taskInfo.priority }}</span>
      </div>
      <div class="task-details__status">
        <span class="task-details--label">Status:</span>
        <span class="task-details--value">{{ taskInfo.status }}</span>
      </div>
    </div>
    <div class="task-info">
      <h1>TaskId-{{ id }}: {{ taskInfo.title }}</h1>
      <div class="descrioption">
        <span class="label">Description</span>
        <p class="text">{{ taskInfo.description }}</p>
      </div>
    </div>
  </div>
  <p v-if="error">Error</p>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      error: null
    }
  },
  computed: {
    taskInfo() {
      return this.$store.getters['tasks/getTaskInfo'];
    },
    assigneeFullName() {
      let fullName = this.taskInfo.assignee.name + ' ' + this.taskInfo.assignee.lastName
      return fullName;
    },
  },
  methods: {
    async getTaskData() {
      try {
        this.$store.dispatch('tasks/getTaskData', { id: this.id });
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  },
  created() {
    this.getTaskData();
  }
}
</script>

<style scoped>
.task-data {
  &__wrapper {
    display: flex;
  }
}

.task-details {
  margin-top: 40px;
  order: 2;
  width: 220px;
}

.task-info {
  width: calc(100% - 220px);
  margin-right: auto;
}

.task-details--label {
  margin-right: 7px;
  font-weight: 700;
}

.task-details--value {}
</style>