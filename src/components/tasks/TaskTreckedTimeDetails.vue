<template>
  <div class="task-details task-details__time task-details--time-trecked">
    <span class="task-details__label task-details__label--time-trecked">Time tracked: </span>
    <div class="task-details__value task-details__value--time-trecked"> 
      <div class="task-details__value-indicator-wrapper">
        <span class="task-details__value-indicator" :style="{'width': loggedTimeIndicatorWidth + '%'}"></span>
      </div>
      <div class="trecked-time-details">
          <span>{{ trecked }} logged</span>
          <span>{{ remaining }} remaining</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['estimated', 'trecked'],
  computed: {
    loggedTimeIndicatorWidth() {
      if (!this.estimated || !this.trecked) return 0;
      let width = (this.trecked / this.estimated) * 100;
      // let width = (2 / this.estimated) * 100;
      return width;
    },
    remaining() {
      let remainingTime = this.estimated - this.trecked;
      return remainingTime;
    }
  },
  mounted() {
    console.log('trecked: ', this.trecked);
  }
    
}
</script>

<style lang="scss" scoped>

</style>