<template>
   <div class="history__list-wrapper">
    <ul class="history__list">
      <li class="history__list-item" v-for="item in activity">
        <HistoryItem :item="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import HistoryItem from '@/components/tasks/task/HistoryItem.vue';
  export default {
    components: {
      HistoryItem
  },
  props: ['activity']
}
</script>

<style lang="scss" scoped>

</style>