<template>
  <div class="task-info__main">
    <h1 class="task-info__title">{{ taskInfo?.id }}: {{ taskInfo?.title }}</h1>
    <div class="task-info__descrioption-wrapper">
      <span class="task-info__label task-info__label--description">Description:</span>
      <div class="task-info__descrioption">
        <p class="text">{{ taskInfo?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['taskInfo']
  }
</script>

<style lang="scss" scoped>

</style>