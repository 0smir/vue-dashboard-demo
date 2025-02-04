<template>
  <section class="section task-activity__wrapper">
    <h4 class="section__title title">Activity</h4>
    <div class="tabs">
      <span class="tabs__label">Show:</span>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'all' }]" @click="updateFilter('all', 'TaskAllActivitiesComponent')">All
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'comment' }]" @click="updateFilter('comment', 'TaskCommentsComponent')">Comments
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'history' }]" @click="updateFilter('history', 'TaskHistoryComponent')">History
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'work-log' }]" @click="updateFilter('work-log', 'TaskWorkLogComponent')">Work log
      </BaseButton>
    </div>
    <div class="tabs__content">
      <component :is="activeComponent" :taskID="taskID" :activity="activityFiltered"></component>
    </div>
    
  </section>
</template>

<script>
import TaskAllActivitiesComponent from '@/components/tasks/task/TaskAllActivitiesComponent.vue';
import TaskCommentsComponent from '@/components/tasks/task/TaskCommentsComponent.vue';
import TaskHistoryComponent from '@/components/tasks/task/TaskHistoryComponent.vue';
import TaskWorkLogComponent from '@/components/tasks/task/TaskWorkLogComponent.vue';

export default {
  components: {
    TaskAllActivitiesComponent,
    TaskCommentsComponent,
    TaskHistoryComponent,
    TaskWorkLogComponent
  },
  props: ['taskID', 'activity'],
  data() {
    return {
      activeItem: 'all',
      activeComponent: 'TaskAllActivitiesComponent',
      activitiesAll: Array.from(Object.values(this.activity))
    }
  },
  computed: {
    activityFiltered() {
      if (this.activeItem === 'all') {
        return Object.values(this.activity);
      }
      return Object.values(this.activity).filter(item => item.mode === this.activeItem);
    }
  },

  methods: {
    updateFilter(mode, componentName) {
      this.activeItem = mode;
      this.activeComponent = componentName;
    },
    
  }
  
}
</script>

<style lang="scss" scoped>
.section {
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  } 
}
.tabs {
  &__content {
    padding-top: 20px;
  }
 
  &__label {
    margin-right: 15px;
  }
}
</style>