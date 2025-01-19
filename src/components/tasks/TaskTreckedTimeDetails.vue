<template>
  <div class="task-details task-details__time task-details--time-trecked">
    <span v-if="isLabelVisible" class="task-details__label task-details__label--time-trecked">Time tracked: </span>
    <div class="task-details__value task-details__value--time-trecked"> 
      <div :class="['task-details__value-indicator-wrapper', {overdue: isTaskOverdue}]">
        <span class="task-details__value-indicator" :style="{'width': loggedTimeIndicatorWidth + '%'}"></span>
      </div>
      <div class="trecked-time-details">
          <span>{{ trecked }} logged</span>
          <span v-if="!isTaskOverdue">{{ remaining }} remaining</span>
          <span v-else>{{ estimated }} original estimated</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLabelVisible', 'estimated', 'trecked'],
  data() {
    return {
      isTaskOverdue: !(this.estimated >= this.trecked)
    }
  },
  computed: {
    loggedTimeIndicatorWidth() {
      let width;
      if (!this.estimated || !this.trecked) return 0;
      if (this.isTaskOverdue) {
        width = (this.estimated / this.trecked) * 100;
      }else{
        width = (this.trecked / this.estimated) * 100;
      }
      return width;
    },
    remaining() {
      let remainingTime = this.estimated - this.trecked;
      return remainingTime;
    }
  }
}
</script>

<style lang="scss" scoped>
.task-details__value-indicator-wrapper {
  &.overdue {
    background-color: var(--color-inreview);
  }
}

</style>