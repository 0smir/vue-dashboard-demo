<template>
  <div v-if="isLoggedIn" class="comments__form-wrapper">
    <UserProfileImg :userInfo="userInfo" theme="light"/>
    <AddCommentForm :taskID="taskID"/>
  </div>
  <div  class="comments__list-wrapper">
    <ul v-if="activity.length" class="comments__list">
      <li class="comments__list-item" v-for="comment in activity">
        <CommentItem :comment="comment" :key="comment.id"/>
      </li>
    </ul>
    <p v-else>No comments</p>
  </div>
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileInfo.vue';
import AddCommentForm from '@/components/tasks/task/AddCommentForm.vue';
import CommentItem from '@/components/tasks/task/CommentItem.vue';

export default {
  props: ['taskID', 'activity'],
  
  components: {
    UserProfileImg,
    AddCommentForm,
    CommentItem
  },
  data() {
    return {
      userInfo: this.$store.getters['users/getUserInfo']
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    }
  } 
}
</script>

<style lang="scss" scoped>
.comments {
  &__form-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }
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