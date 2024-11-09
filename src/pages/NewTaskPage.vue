<template>
  <div class="container">
    <h1>Create New Task</h1>
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

<style scoped></style>