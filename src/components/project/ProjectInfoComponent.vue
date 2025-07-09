<template>
  <div>
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

</style>