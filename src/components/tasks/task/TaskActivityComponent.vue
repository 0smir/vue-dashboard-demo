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
      <BaseButton :class="['tabs__btn', { active: activeItem === 'logTime' }]" @click="updateFilter('logTime', 'TaskWorkLogComponent')">Work log
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
      isLoading: false,
      activeItem: 'all',
      activeComponent: 'TaskAllActivitiesComponent',
      activitiesAll: Array.from(Object.values(this.activity)),
      authorsDataList: []
    }
  },
  computed: {
    enrichedHistory() {
      return Object.entries(this.activity).map(([id, update]) => {
        const author = this?.authorsDataList.find(user => user.id === update.authorID) || { name: 'Unknown', lastName: '' };
        return {
          id,
          ...update,
          authorName: author.name,
          authorLastName: author.lastName
        };
      });
    },
    activityFiltered() {
      let updatesHistory = this.enrichedHistory;
      if (this.activeItem === 'all') {
        return updatesHistory;
      }
      return updatesHistory.filter(item => item.mode === this.activeItem);
    }
  },

  methods: {
    updateFilter(mode, componentName) {
      this.activeItem = mode;
      this.activeComponent = componentName;
    },
      
    getAuthorsData() {
      let activity  = Object.values(this.activity);
      let uniqueIDList = [...new Set(activity.map((item => item.authorID)))];
      let requests = uniqueIDList.map((id) => fetch(`https://jira-vue-demo-default-rtdb.firebaseio.com/people/${id}.json`));
      
      this.isLoading = true;

      Promise.all(requests)
        .then((resp) => Promise.all(resp.map(r => r.json())))
        .then((users) => { 
          let authorsData = [];  
          users.forEach(user => {
            authorsData.push(user);
          });
          this.authorsDataList = authorsData;
      })
    }
  },
  mounted() {
    if (this.activity) {
      this.getAuthorsData();
    }
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
    padding: 20px 0;
  }
 
  &__label {
    margin-right: 15px;
  }
}
</style>