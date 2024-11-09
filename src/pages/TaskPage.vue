<template>
  <div class="container task-data">
    <div class="task-details">
      <div class="task-details__creator">
        <span class="task-details--label">Creator: </span>
        <span class="task-details--value"> {{ taskInfo.creator }}</span>
      </div>
      <div class="task-details__executor">
        <span class="task-details--label">Executor:</span>
        <span class="task-details--value"> {{ taskInfo.executor }}</span>
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
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      taskInfo: null
    }
  },
  methods: {
    getTaskData() {
      let taskItem = this.$store.getters['tasks/getTasksList'].filter((task) => task.id === this.id);
      this.taskInfo = taskItem[0];
    }
  },
  created() {
    this.getTaskData();
  }

}
</script>

<style scoped>
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