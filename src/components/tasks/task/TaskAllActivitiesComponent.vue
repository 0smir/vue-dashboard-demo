<template>
  <div class="content">
    <ul>
      <li v-for="item in activity">
        <template v-if="item.mode === 'comment'">
          <CommentItem :comment="item" :key="item.id"/>
        </template>
        <template v-else-if="item.mode === 'logTime'">
          <WorkLogItem :workLog="item" :key="item.id"/>
        </template>
        <template v-else>
          <HistoryItem :item="item" :key="item.id"/>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import CommentItem from '@/components/tasks/task/CommentItem.vue';
import WorkLogItem from '@/components/tasks/task/WorkLogItem.vue';
import HistoryItem from '@/components/tasks/task/HistoryItem.vue';
export default {
  components: {
    CommentItem,
    WorkLogItem,
    HistoryItem
  },
  props: ['taskID', 'activity']
}
</script>