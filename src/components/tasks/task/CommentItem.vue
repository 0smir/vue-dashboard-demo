<template>
  <div class="comment__item">
    <UserProfileImg :userInfo="userInfo"/>
    <div class="comment__content">
      <div class="comment__details"> <span class="author">{{ authorFullName }}</span> <span class="poste-time">Posted at:</span> {{ commentPostTime }}</div>
      <div class="comment__comment-text">
        {{ comment.newValue.commentText }}
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileImg.vue';

export default {
  props: ['comment'],
  components: {
    UserProfileImg
  },
  computed: {
    commentPostTime() {
      return this.timeFormattedData(this?.comment?.updateTime);
    },
    userInfo() {
      return {
        name: this?.comment?.authorName,
        lastName: this?.comment?.authorLastName
      }
    },
    authorFullName() {
      return `${this?.comment?.authorName} ${this?.comment?.authorLastName}`;
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
.comment {
  &__item {
    display: flex;
    margin-bottom: 20px;
  }
  &__content {
    padding-left: 5px;
  }
  &__details {
    margin-bottom: 7px;
    font-size: 12px;
    
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
  &__comment-text {
    color: var( --color-tetriary);
  }
}
</style>