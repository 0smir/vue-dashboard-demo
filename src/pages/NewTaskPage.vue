<template>
  <div class="container">
    <h2 class="title">Create New Task</h2>
    <CreateTaskForm :userID="userID"/>
  </div>
</template>

<script>
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue';

export default {
  components: {
    CreateTaskForm
  },
  computed: {
    userID() {
      return this.$store.getters['users/userID'];
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 20px;
}

.title {
  margin: 20px 0 20px;
  text-align: center;
  text-transform: uppercase;
  font-size: 26px;

  @media(min-width: $sm) {
    margin: 40px 0 40px;
  }
}
</style>