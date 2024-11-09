<template>
  <div :class="['task-item', taskStatusStyle]">
    <small>{{ id }}</small>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <router-link :to="'/tasks/' + id">See details</router-link>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'description', 'status'],
  computed: {
    taskStatusStyle() {
      return 'task-status--' + this.status.toLowerCase();
    }
  }

}
</script>

<style scoped>
.task-item {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 8px solid;
}

.task-status--todo {
  background-color: #04c7e5;
  border-color: #325f7d;
}

.task-status--inprogress {
  background-color: #ffc405;
  border-color: #5a5d5c;
}

.task-status--inreview {
  background-color: #fe7453;
  border-color: #5c4d60;
}

.task-status--testing {
  background-color: #9c27b0;
  border-color: #7d6e77;
}

.task-status--done {
  background-color: #56daa4;
  border-color: #3e5f72;
}

.task-status--blocked {
  background-color: #ff7b7d;
  border-color: #5c4d60;
}
</style>