<template>
  <div class="time-log__item">
    <div class="flex time-log__details">
      <UserProfileImg :userInfo="userInfo"/>
      <span class="author">{{ authorFullName }}</span> 
      <span class="poste-time" v-html="updateTime"></span>
    </div>
    
    <div class="time-log__description">
      <div class="time-log__description-item">
        <span class="description-label">Time spent: </span>
        <span class="description-value">{{ timeSpent }}</span>
      </div>
      <div class="time-log__description-item">
        <span class="description-label">Date: </span><span class="description-value" v-html="dateOfLog"></span>
      </div>
      <div class="time-log__description-item">
        <span class="description-label">Comment: </span><p class="description-value time-log__description-text">{{ workDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileImg.vue';
export default {
  components: {
    UserProfileImg
  },
  props: ['workLog'],
  computed: {
    userInfo() {
      return {
        name: this?.workLog?.authorName,
        lastName: this?.workLog?.authorLastName
      }
    },
    authorFullName() {
      return `${this?.workLog?.authorName} ${this?.workLog?.authorLastName}`;
    },
    timeSpent() {
      return this.workLog.newValue.loggedTime + 'h';
    },
    workDescription() {
      return this.workLog.newValue.loggedTimeDescription || '<No comment>';
    },
    dateOfLog() {
      return this.timeFormattedData(this.workLog.newValue.loggedTimeDate);
    },
    updateTime() {
      return this.timeFormattedData(this.workLog.updateTime, true);
    }
  },
  methods: {
    timeFormattedData(timestamp, full=false) {
      if (!timestamp) return '';

      let creatinDate = new Date(timestamp);
      let year    = creatinDate.getFullYear();
      let month   = String(creatinDate.getMonth() + 1).padStart(2, '0');
      let day     = String(creatinDate.getDate()).padStart(2, '0');
      let hour    = String(creatinDate.getHours()).padStart(2, '0');
      let minute  = String(creatinDate.getMinutes()).padStart(2, '0');
      let seconds = String(creatinDate.getSeconds()).padStart(2, '0');  

      return full ? `Posted: <span class="date-time">${year}-${month}-${day}</span> at <span class="date-time">${hour}:${minute}:${seconds}</span>`
                  : `<span class="date-time">${year}-${month}-${day}</span>`;
    }
  }
    
}
</script>

<style lang="scss" scoped>
.time-log {
  &__item {
    margin-bottom: 20px;
  }
  &__details {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
  }
  &__description {
    padding-left: 35px;
  }
  &__description-item {
    display: flex;
    margin-bottom: 7px;

    .description-label,
    .description-value {
      display: flex;
    } 

    .description-label {
      color: var(--color-tetriary);
      flex: 1 1 75px;
    }
    .description-value {
      flex: 5 1 150px;
    }
  }
  
}

.author {
  display: inline-flex;
  padding: 7px 5px 5px 5px;
  margin-right: 7px;
  border-radius: var(--border-radius-large);
  background-color: var(--color-primary-light);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}
.poste-time {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 500;

  ::v-deep .date-time {
    color: var(--color-secondary);
    font-weight: 400;
  }
}

</style>