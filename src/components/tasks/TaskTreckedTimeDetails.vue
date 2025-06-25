<template>
  <div class="task-details task-details__time task-details--time-trecked">
    <span v-if="isLabelVisible" class="task-details__label task-details__label--time-trecked">Time tracked: </span>
    <div :class="classNamesList"> 
      <div :class="['time-line__treck', {overdue: isTaskOverdue}]">
        <span class="time-line__time-indicator" :style="{'width': loggedTimeIndicatorWidth + '%'}"></span>
      </div>
      <div class="time-line__details">
          <span v-if="!trecked">0h logged</span>
          <span v-else>{{ trecked + 'h' }} logged</span>
          <span v-if="!isTaskOverdue">{{ remaining }}h remaining</span>
          <span v-else>{{ estimated + 'h' }} original estimation</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLabelVisible', 'estimated', 'trecked'],
  data() {
    return {
      isTaskOverdue: this?.trecked >= this?.estimated
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
    },
    classNamesList() {
      return this.isLabelVisible ? 'task-details__value' : 'time-line__wrapper';
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  &__wrapper {
    width: 100%;
  }

  &__treck {
    overflow: hidden;
    margin-bottom: 5px;
    width: 100%;
    height: 10px;
    border: 1px solid var(--color-secondary);
    border-radius: var(--border-radius-medium);

    &.overdue {
      background-color: var(--color-inreview);
    }
  }

  &__time-indicator {
    display: block;
    background-color: var(--color-primary);
    height: 100%;
  }

  &__details{
    display: flex;
    justify-content: space-between;
    width: 100%;

    span{
      font-size: 10px;
      color: var(--color-secondary);
    }
  }
}
</style>