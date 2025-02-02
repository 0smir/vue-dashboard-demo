<template>
  <div>
    <div class="user-profile__image-wrapper rounded">
      <span>{{ userInitials }}</span>
    </div>
  </div>
</template>

<script>
  
export default {
  props: ['userInfo'],
  computed: {
    userInitials() {
      let initials = this?.userInfo?.lastName.charAt(0).toUpperCase() + this?.userInfo?.lastName.charAt(0).toUpperCase();
      return initials;
    }
  }
}
</script>

<style lang="scss">
.user-profile {
  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    width: 34px;
    height: 34px;
    border: 2px solid var(--color-dark-bg);
    font-size: 16px;
    color: var(--color-text-dark);
    background-color: var(--color-white);
    font-weight: 400;
    padding: 2px;
  }
}
</style>