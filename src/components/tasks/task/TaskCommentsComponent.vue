<template>
  <div v-if="isLoggedIn" class="comments__form-wrapper">
    <UserProfileImg :userInfo="userInfo"/>
    <AddCommentForm />
  </div>
  <div v-if="activity.length" class="comments__list-wraper">
    <ul class="comments__list">
      <li class="comments__list-item">
        <CommentItem />
      </li>
    </ul>
  </div>
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileImg.vue';
import AddCommentForm from '@/components/tasks/task/AddCommentForm.vue';
import CommentItem from '@/components/tasks/task/CommentItem.vue';

export default {
  props: ['activity'],
  
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
  },
  created() {
    console.log(this.activity.length);
    
  }
}
</script>

<style lang="scss" scoped>
.comments {
  &__form-wrapper {
    display: flex;
  }
  &__list-wraper {
    padding-top: 50px;
    border-top: 2px solid var(--color-secondary-medium);
    margin-top: 15px;
  }
}
</style>