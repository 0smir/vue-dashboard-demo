<template>
  <header class="header">
    <div class="header__content">
      <router-link to="/" class="header-logo" title="Company logo and name: GlobalBoard" aria-label="Company logo and name: GlobalBoard, link to home page">
        <SvgIcon name="logo" class="icon icon--logo header-logo__icon" />
        <span class="company-name">GlobalBoard</span>
      </router-link>
      <nav>
        <ul class="header__nav">
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/" title="Home" aria-label="link to: Home">Home</router-link></li>
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/" title="About" aria-label="link to: About">About</router-link></li>
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/" title="Projects" aria-label="link to: Projects">Projects</router-link></li>
        </ul>
      </nav>
      <div v-if="!isLoggedIn" class="header__actions">
        <router-link to="/login" class="header__link header__auth-link header__auth-link--login" title="Login" aria-label="link to: Login">Login</router-link>
        <router-link to="/people/registration" class="header__link header__auth-link header__auth-link--registration" title="link to: SignUp" aria-label="SignUp">SignUp</router-link>
      </div>
      <div v-else  class="header__actions">
        <UserProfile />
      </div>
    </div>
  </header>
</template>

<script>
import UserProfile from '@/components/people/UserProfileDropdown.vue';
export default {
  components: {
    UserProfile
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 15px;
  width: 100%;
  min-height: 75px;
  background-color: var(--color-primary);

  @media print {
    display: none;
  }

  &__content {
    display: flex;
    justify-content: space-between;
  }

  .header-logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 26px;
    text-decoration: none;

    &:hover {
      color: var(--color-primary-light);
    }

    .company-name {
      margin-left: 7px;
    }

    &__icon {
      width: 35px;
      height: 35px;
    }
  }


  &__nav {
    display: none;
    list-style: none;

    @media (min-width: 769px) {
      display: flex;
    }

    &-item {
      margin-right: 10px;
    }
  }

  &__actions {
    display: flex;
  }

  &__link {
    display: block;
    padding: 10px 5px;
    text-decoration: none;
  }

  &__nav-link {
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid var(--color-primary-medium);
    }
  }

  &__auth-link {
    border-radius: var(--border-radius-medium);
    border: 1px solid transparent;
    &:hover{
      border: 1px solid var(--color-primary-light);
    }
    &--login{
      margin-right: 5px;
      
    }
  }
}
</style>