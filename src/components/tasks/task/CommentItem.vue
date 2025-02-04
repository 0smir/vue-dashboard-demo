<template>
  <div class="comment__item">
    <UserProfileImg :userInfo="comentAuthorInfo"/>
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
  data() {
    return {
      error: null,
      comentAuthorInfo: null
    }
  },
  computed: {
    commentPostTime() {
      return this.timeFormattedData(this.comment.updateTime);
    },
    authorFullName() {
      return `${this.comentAuthorInfo?.name} ${this.comentAuthorInfo?.lastName}`;
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
    },
    loadUserData(authorID) {
      let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/people/${authorID}.json`;
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          this.comentAuthorInfo = data;
        })
        .catch((error) => { this.error = 'falid with' + error})
        .finally()
    }
  },
  created() {
    if (this.comment.authorID !== this.$store.getters['users/userID']) {
      this.loadUserData(this.comment.authorID);
    } else {
      this.comentAuthorInfo = this.$store.getters['users/getUserInfo'];
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