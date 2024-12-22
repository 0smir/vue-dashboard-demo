<template>
  <header class="header">
    <div class="container header__content">
      <router-link to="/" class="header-logo">
        <SvgIcon name="logo" class="icon icon--logo header-logo__icon" />
        <span class="company-name">GlobalBoard</span>
      </router-link>
      <nav>
        <ul class="header__nav">
          <li class="header__nav-item"><router-link to="/">Home</router-link></li>
          <li class="header__nav-item"><router-link to="/">About</router-link></li>
          <li class="header__nav-item"><router-link to="/">Projects</router-link></li>
        </ul>
      </nav>
      <div class="header__actions">
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <BaseButton v-else class="btn btn__default btn--medium btn-logout" @click="logOut">Logout</BaseButton>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('users/logout');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 15px 0;
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
}
</style>