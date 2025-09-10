<template>
  <div class="user-profile__data-wrapper">
    <div :class="['user-profile__image-wrapper', 'rounded', {[theme]: theme}, {[size]: size}]" 
        :title="userFullName" :aria-label="`user name: ${userFullName}`">
      <span>{{ userInitials }}</span>
    </div>
    <div v-if="showName" class="user-profile__full-name" :aria-label="`user name: ${userFullName}`">{{userFullName}}</div>
  </div>
</template>

<script>
  
export default {
  props: ['userInfo', 'theme', 'showName', 'size'],
  computed: {
    userInitials() {
      let initials = this?.userInfo?.name.charAt(0).toUpperCase() + this?.userInfo?.lastName.charAt(0).toUpperCase();
      return initials;
    },
    userFullName() {
      return `${this?.userInfo?.name} ${this?.userInfo?.lastName}`;
    }
  }
}
</script>

<style lang="scss">
.user-profile{
  &__data-wrapper {
    display: flex;
    align-items: center;
    &:has(.user-profile__full-name) {
      &>.user-profile__image-wrapper {
        margin-right: 5px;
      }
    }
  }
  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:0;
    width: 34px;
    height: 34px;
    border: 2px solid;
    font-size: 16px;
    color: $color-text-dark;
    background-color: $color-white;
    font-weight: 400;
    padding: 2px;

    &.dark {
      border-color: $color-dark-bg;
    }
    &.blue {
      border-color: $color-primary;
      background-color: $color-primary-light;
    }
    &.light {
      border-color: $color-primary;
      background-color: $color-white;
    }
    &.large {
      width: 70px;
      height: 70px;
      font-size: 28px;
    }
    &.medium {
      width: 34px;
      height: 34px;
      font-size: 16px;
    }
    &.small {
      width: 25px;
      height: 25px;
      font-size: 12px;
    }
  }
  &__full-name {
    text-transform: capitalize;
    white-space: nowrap;
  }
}
</style>