<template>
  <header class="header">
    <div class="header__content">
      <router-link to="/" class="header-logo">
        <SvgIcon name="logo" class="icon icon--logo header-logo__icon" />
        <span class="company-name">GlobalBoard</span>
      </router-link>
      <nav>
        <ul class="header__nav">
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/">Home</router-link></li>
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/">About</router-link></li>
          <li class="header__nav-item"><router-link class="header__link header__nav-link" to="/">Projects</router-link></li>
        </ul>
      </nav>
      <div v-if="!isLoggedIn" class="header__actions">
        <router-link to="/login" class="header__link header__auth-link header__auth-link--login">Login</router-link>
        <router-link to="/people/registration" class="header__link header__auth-link header__auth-link--registration">SignUp</router-link>
      </div>
      <div v-else  class="header__actions">
        <UserProfile />
      </div>
    </div>
  </header>
</template>

<script>
import UserProfile from '@/components/people/UserProfile.vue';
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
  background-color: var(--color-primary);

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