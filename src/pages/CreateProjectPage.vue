<template>
  <div class="container">
    <h2 class="title page-title">Create new project</h2>
    <CreateProjectForm />
  </div>
</template>

<script>
import CreateProjectForm from '@/components/project/CreateProjectForm.vue';
export default {
  components: {
    CreateProjectForm
  },
  data() {
    return {

    }
  }

}
</script>

<style lang="scss" scoped></style>