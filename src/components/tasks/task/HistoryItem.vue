<template>
  <div class="activity-item">
    <UserProfileImg :userInfo="userInfo" theme="light"/>
    <div class="activity-item__content">
      <div class="activity-item__details">
        <span class="author">{{ authorFullName }}</span>
        <span class="updates-info">change task <strong>{{ item.mode }}</strong> at: </span>
        <span class="poste-time">{{ updateTime }}</span>
      </div>
      <p class="activity-item__description">
        Task {{ item.mode }} update to <strong :class="{ 'capitalize': item.mode !== 'status' }">{{ item.newValue }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileInfo.vue';
export default {
  components: {
    UserProfileImg
  },
  props: ['item'],
  computed: {
    userInfo() {
      return {
        name: this?.item?.authorName,
        lastName: this?.item?.authorLastName
      }
    },
    authorFullName() {
      return `${this?.item?.authorName} ${this?.item?.authorLastName}`;
    },
    updateTime() {
      return this.timeFormattedData(this.item.updateTime);
    }
  },
  methods: {
    timeFormattedData(timestamp) {
      if (!timestamp) return '';

      let creatinDate = new Date(timestamp);
      let year    = creatinDate.getFullYear();
      let month   = String(creatinDate.getMonth() + 1).padStart(2, '0');
      let day     = String(creatinDate.getDate()).padStart(2, '0');
      let hour    = String(creatinDate.getHours()).padStart(2, '0');
      let minute  = String(creatinDate.getMinutes()).padStart(2, '0');
      let seconds = String(creatinDate.getSeconds()).padStart(2, '0');  

      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    }
  }
    
}
</script>

<style lang="scss" scoped>
.activity-item {
  display: flex;
  margin-bottom: 20px;
  
  &__details {
    margin-bottom: 7px;
    font-size: 12px; 
  }

  &__description {
    color: var(--color-tetriary);
  }

  .author {
    display: inline-flex;
    padding: 7px 5px 5px 5px;
    margin-right: 7px;
    border-radius: var(--border-radius-large);
    background-color: var(--color-primary-light);
    font-weight: 500;
    text-transform: uppercase;
  }

  .poste-time {
    color: var(--color-primary);
    font-weight: 500;
  }
}

</style>