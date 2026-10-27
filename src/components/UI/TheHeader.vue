<template>
  <header class="header">
    <div class="header__content">
      <BaseButton class="btn btn__default btn--small header__mobile-nav" @click="toggleSidebar">
        <SvgIcon name="bars-4" class="icon" />
      </BaseButton>
      <router-link
        to="/"
        class="header-logo"
        title="Company logo and name: GlobalBoard"
        aria-label="Company logo and name: GlobalBoard, link to home page"
      >
        <SvgIcon name="logo" class="icon icon--logo header-logo__icon" />
        <span class="company-name">GlobalBoard</span>
      </router-link>
      <nav class="header__nav-wrapper">
        <ul class="header__nav">
          <li class="header__nav-item">
            <router-link
              class="header__link header__nav-link"
              to="/"
              :title="$t('common.header.navigation.home_link')"
              :aria-label="
                $t('common.link_label', {
                  linkName: $t('common.header.navigation.home_link'),
                })
              "
              >{{ $t("common.header.navigation.home_link") }}</router-link
            >
          </li>
          <li class="header__nav-item">
            <router-link
              class="header__link header__nav-link"
              to="/"
              :title="$t('common.header.navigation.about_link')"
              :aria-label="
                $t('common.link_label', {
                  linkName: $t('common.header.navigation.about_link'),
                })
              "
              >{{ $t("common.header.navigation.about_link") }}</router-link
            >
          </li>
          <li class="header__nav-item">
            <router-link
              class="header__link header__nav-link"
              to="/projects/all"
              :title="$t('common.header.navigation.about_link')"
              :aria-label="
                $t('common.link_label', {
                  linkName: $t('common.header.navigation.about_link'),
                })
              "
              >{{ $t("common.header.navigation.projects_link") }}</router-link
            >
          </li>
        </ul>
      </nav>
      <LanguageSwitcher placement="header"/>
      <div v-if="!isLoggedIn" class="header__actions">
        <router-link
          to="/login"
          class="header__link header__auth-link header__auth-link--login"
          :title="$t('common.header.navigation.login_link')"
          :aria-label="
            $t('common.link_label', {
              linkName: $t('common.header.navigation.login_link'),
            })
          "
          >{{ $t("common.header.navigation.login_link") }}</router-link
        >
        <router-link
          to="/registration"
          class="header__link header__auth-link header__auth-link--registration"
          :title="$t('common.header.navigation.signup_link')"
          :aria-label="
            $t('common.link_label', {
              linkName: $t('common.header.navigation.signup_link'),
            })
          "
          >{{ $t("common.header.navigation.signup_link") }}</router-link
        >
      </div>
      <div v-else class="header__actions">
        <UserProfile />
      </div>
    </div>
  </header>
</template>

<script>
import UserProfile from "@/components/people/UserProfileDropdown.vue";
export default {
  props: {
    isSidebarExpanded: { type: Boolean, default: false },
  },
  emits: ["toggle-sidebar"],
  components: {
    UserProfile,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["users/isAuthenticated"];
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 15px;
  width: 100%;
  min-height: 75px;
  background: $main-gradient;

  @media print {
    display: none;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__mobile-sidebar-control {
    display: block;
    color: $color-text;

    @media(min-width: $md) {
      display: none;
    }
  }

  &__mobile-nav {
    @media(min-width: $md) {
      display: none;
    }
  }

  .header-logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 26px;
    text-decoration: none;

    @media(max-width: $md) {
      margin: 0 auto 0 15px;
    }

    @media(max-width: $sm) {
      margin: 0 auto;
    }

    &:hover {
      color: $color-primary-light;
    }

    .company-name {
      display: none;
      margin-left: 7px;

      @media(min-width: $sm) {
        display: inline-block;
      }

    }

    &__icon {
      width: 35px;
      height: 35px;
    }
  }

  &__nav {
    display: none;
    list-style: none;

    @media (min-width: $md) {
      display: flex;
    }

    &-item {
      margin-right: 10px;
    }
  }

  &__nav-wrapper {
    @media (min-width: $md) {
      margin: 0 auto;
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
      border-bottom: 2px solid $color-primary-medium;
    }
  }

  &__auth-link {
    border-radius: $border-radius-medium;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid $color-primary-light;
    }
    &--login {
      margin-right: 5px;
    }
  }

  .language-switcher--header {
    display: none;
    @media(min-width: $md) {
      display: inline-flex;
    }
  }
}
</style>
