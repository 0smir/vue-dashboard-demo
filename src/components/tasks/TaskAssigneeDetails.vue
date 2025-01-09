<template>
  <div class="task-details task-details--assignee" v-if="assigneeFullName">
    <span class="task-details__label task-details__label--assignee">Assignee:</span>
    <span class="task-details__value task-details__value--assignee"> {{ assigneeFullName }}</span>
  </div>
</template>

<script>
export default {
    props:['assigneeFullName'],
    
  }
</script>

<style lang="scss" scoped>

</style>