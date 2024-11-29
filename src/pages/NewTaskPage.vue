<template>
  <div class="container">
    <h1 class="title">Create New Task</h1>
    <CreateTaskForm></CreateTaskForm>
  </div>
</template>

<script>
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';

export default {
  components: {
    CreateTaskForm
  }

}
</script>

<style scoped>
.title {
  margin: 40px 0 40px;
  text-align: center;
  text-transform: uppercase;
}
</style>