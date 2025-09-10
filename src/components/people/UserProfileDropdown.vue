<template>
  
    <div v-if="userInfo" class="relative user-profile" v-click-outside="closeUserNav">
      <BaseButton :class="['btn btn--transparent user-profile__btn-action', {active: isNavOpened}]" @click="toggleUserNav" aria-label="click to open user navigation">
        <UserProfileImg :userInfo="userInfo" theme="dark" />
        <span class="icon-wrapper">
          <SvgIcon name="chevron-down" class="icon icon--medium" />
        </span>
      </BaseButton>
      <ul v-show="isNavOpened" class="user-profile__nav">
        <li class="user-profile__nav-item"><router-link class="user-profile__link" :to="userProfileLink" title="My Profile" aria-label="link to: My Profile">My Profile</router-link></li>
        <li class="user-profile__nav-item"><router-link class="user-profile__link" to="/" title="My boards" aria-label="link to: My boards">My boards</router-link></li>
        <li class="user-profile__nav-item"><router-link class="user-profile__link" to="/" title="My Projects" aria-label="link to: My Projects">My Projects</router-link></li>
        <li class="user-profile__nav-item">
          <BaseButton class="btn btn__default btn--medium user-profile__btn-logout" @click="logOut" >
            <SvgIcon name="logout" class="icon" />
            <span>Logout</span>
          </BaseButton>
        </li>
      </ul>
    </div>
  
</template>

<script>
import UserProfileImg from '@/components/auth/UserProfileInfo.vue';
export default {
  components: {
    UserProfileImg
  },
  data() {
    return {
      isNavOpened: false
    }
  },
  
  computed: {
    userInfo() {
      return this.$store.getters['users/getUserInfo'];
    },
    userProfileLink() {
      return '/people' + '/' + this?.userInfo?.id;
    },
    userInitials() {
      let initials = this?.userInfo?.lastName.charAt(0).toUpperCase() + this?.userInfo?.lastName.charAt(0).toUpperCase();
      return initials;
    }
  },
  methods: {
    toggleUserNav() {
      this.isNavOpened = !this.isNavOpened;
    },
    closeUserNav() {
      this.isNavOpened = false;
    },
    logOut() {
      this.$store.dispatch('users/logout');
    }
  },
  watch: {
    $route() {
      this.closeUserNav();
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  &__nav {
    position: absolute;
    top: calc(100% - (-5px));
    left: 100%;
    z-index: 10;
    overflow-x: hidden;
    padding-left: 0;
    list-style: none;
    width: 170px;
    border: 1px solid $color-secondary-light;
    border-bottom: none;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 
                0 3px 1px -2px rgba(0,0,0,.2), 
                0 1px 5px 0 rgba(0,0,0,.12);
    background: $color-white;
    border-radius: $border-radius-medium;
    transform: translateX(-100%);
  }
  &__nav-item {
    margin-bottom: 7px;

    &:last-of-type {
      margin:  0;
      padding-top: 15px;
      border-top: 1px solid $color-secondary-light;
    }
  }
  &__btn-action {
    color: $color-text;
    
    &:hover>.user-profile__image-wrapper{
      background-color: $color-primary-light;
    }

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 35px;
    }
    &.active {
      .icon-wrapper{
        transform: rotate(180deg);
      }
    }
  }
  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    width: 34px;
    height: 34px;
    border: 2px solid $color-dark-bg;
    font-size: 16px;
    color: $color-text-dark;
    background-color: $color-white;
    font-weight: 400;
    padding: 2px;
  }
  &__btn-logout {
    width: 100%;
    border-radius: 0;
  }
  &__link {
    display: block;
    width: 100%;
    padding: 10px 15px;
    color: $color-dark-bg;
    text-decoration: none;
    &:hover{
      background: $color-primary-light;
    }
  }
}
</style>