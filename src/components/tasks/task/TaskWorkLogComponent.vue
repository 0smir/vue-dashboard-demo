<template>
  <div class="time-log__list-wrapper">
    <ul v-if="activity.length" class="time-log__list">
      <li class="time-log__list" v-for="work in activity">
        <WorkLogItem :workLog="work" :key="work.id"/>
      </li>
    </ul>
    <p v-else>No time logged yet</p>
  </div>
</template>

<script>
import WorkLogItem from '@/components/tasks/task/WorkLogItem.vue';

export default {
  components: {
    WorkLogItem
  },
  props: ['activity']
}
</script>

<style lang="scss" scoped>

.time-log {
  &__list-wrapper {
    margin-top: 15px;
    @media (min-width: $sm) {
      padding-left: 10px; 
    }
    @media (min-width: $md) {
      padding-left: 20px;
    }
  }
}
</style>