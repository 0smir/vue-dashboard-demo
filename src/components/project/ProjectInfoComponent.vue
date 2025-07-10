<template>
  <div class="projects__project-info">
    <div>Title: {{ project.title }}</div>
    <div>ID: {{ project.id }}</div>
    <div>Description: {{ project.description }}</div>
  </div>
</template>

<script>
export default {
    props: ['project'],
    
  }
</script>

<style lang="scss" scoped>
.projects {
  &__project-info {
    padding: 10px;
    height: 100%;
    background-color: var(--color-white);
  }
}
</style>