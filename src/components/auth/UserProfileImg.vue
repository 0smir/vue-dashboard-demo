<template>
  <div>
    <div :class="['user-profile__image-wrapper', 'rounded', {[theme]: theme}, {[size]: size}]" 
        :title="userFullName">
      <span>{{ userInitials }}</span>
    </div>
  </div>
</template>

<script>
  
export default {
  props: ['userInfo', 'theme', 'size'],
  computed: {
    userInitials() {
      let initials = this?.userInfo?.name.charAt(0).toUpperCase() + this?.userInfo?.lastName.charAt(0).toUpperCase();
      return initials;
    },
    userFullName() {
      return `${this?.userInfo?.name.toUpperCase()} ${this?.userInfo?.lastName.toUpperCase()}`;
    }
  },
  mounted() {
    if (this.theme) {
      console.log(this.theme);
    } else {
      console.log('no theme');
    }
  }
}
</script>

<style lang="scss">
.user-profile__image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  width: 34px;
  height: 34px;
  border: 2px solid;
  font-size: 16px;
  color: var(--color-text-dark);
  background-color: var(--color-white);
  font-weight: 400;
  padding: 2px;

  &.dark {
    border-color: var(--color-dark-bg);
  }
  &.light {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }

}
</style>