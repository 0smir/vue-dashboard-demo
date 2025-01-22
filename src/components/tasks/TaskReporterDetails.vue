<template>
  <div class="task-details task-details--creator">
    <span class="task-details__label task-details__label--creator">Reporter: </span>
    <span class="task-details__value task-details__value--creator" v-if="reporterFullName"> {{ reporterFullName }}</span>
  </div>
</template>

<script>
export default {
  props: ['reporter'],
  computed: {
    reporterFullName() {
        return this.reporter ? `${this.reporter.name} ${this.reporter.lastName}` : 'Unassigned';
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>