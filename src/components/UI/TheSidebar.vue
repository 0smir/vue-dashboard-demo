<template>
  <aside :class="['sidebar', { open: isExpanded, close: !isExpanded }]">
    <div class="sidebar__controls-wrapper">
      <BaseButton
        class="btn btn__default btn--small sidebar__controls-btn"
        :alt="sidebarControlAltText"
        :aria-label="sidebarControlAltText"
        @click="toggleSidebar"
      >
        <SvgIcon v-if="isExpanded" name="chevronLeft" class="icon sidebar__controls-icon" />
        <SvgIcon v-else name="chevronRight" class="icon sidebar__controls-icon" />
      </BaseButton>
    </div>
    <h4 class="sidebar__space-name">WORKSPACE</h4>
    <ul class="sidebar-nav">
      <li class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/"
          exact
          :title="$t('common.sidebar.boards_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.boards_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="board" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.boards_link")
          }}</span></router-link
        >
      </li>
      <li class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/"
          exact
          :title="$t('common.sidebar.statistic_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.statistic_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="statistic" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.statistic_link")
          }}</span></router-link
        >
      </li>
      <li class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/tasks"
          exact 
          :title="$t('common.sidebar.tasks_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.tasks_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="tasks" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.tasks_link")
          }}</span></router-link
        >
      </li>
      <li class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/people"
          exact
          :title="$t('common.sidebar.people_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.people_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="users" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.people_link")
          }}</span></router-link
        >
      </li>
      
    </ul>
    <h4 class="sidebar__space-name">System</h4>
    <ul class="sidebar-nav">
      <li class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/"
          exact
          :title="$t('common.sidebar.settings_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.settings_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="settings" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.settings_link")
          }}</span></router-link
        >
      </li>
      <li v-if="isLoggedIn" class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/create"
          exact
          :title="$t('common.sidebar.create_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.create_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="add" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.create_link")
          }}</span>
        </router-link>
      </li>
      <li v-else class="sidebar__nav-item">
        <router-link
          class="sidebar__link"
          to="/people/registration"
          exact
          :title="$t('common.sidebar.login_link')"
          :aria-label="
            $t('common.header.link_label', {
              linkName: $t('common.sidebar.login_link'),
            })
          "
        >
          <span class="sidebar__link-icon">
            <SvgIcon name="addperson" class="icon" />
          </span>
          <span :class="['sidebar__link-text', { tooltip: !isExpanded }]">{{
            $t("common.sidebar.login_link")
          }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-sidebar"],

  computed: {
    isLoggedIn() {
      return this.$store.getters["users/isAuthenticated"];
    },
    sidebarControlAltText() {
      return this.isExpanded ? "expanded" : "collapsed";
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  color: $color-text;
  border-top: 1px solid $color-primary-medium;
  background: $primary-gradient;
  padding: 10px 15px;

  @media (min-width: $md) {
    position: absolute;
    z-index: 10;
  }

  @media print {
    display: none;
  }

  &.close {
    width: 100%;
    transition: all 0.35s ease;
    @media (min-width: $sm) {
      width: 75px;
    }
    .sidebar__controls-wrapper {
      justify-content: center;
    }

    .sidebar__link {
      justify-content: center;

      &:hover {
        .tooltip {
          display: block;
        }
      }
    }

    .sidebar__link-icon {
      margin-right: 0;
    }

    .sidebar__link-text {
      display: none;
    }

    .sidebar__space-name {
      display: none;
    }
  }

  &.open {
    width: 200px;
    transition: all 0.35s ease;

    .sidebar__link-text {
      display: inline;
    }

    .sidebar__space-name {
      display: block;
    }
  }

  .tooltip {
    position: absolute;
    display: flex;
    padding: 3px 7px;
    left: calc(100% - 3px);
    background-color: $color-primary-light;
    border: 1px solid $color-secondary-light;
    border-radius: $border-radius-small;
    color: $color-secondary;
    z-index: 12;

    &::before,
    &::after {
      position: absolute;
      top: calc(50% - 8px);
      border: 8px solid transparent;
      content: "";
    }

    &::before {
      left: -15px;
      z-index: 2;
      border-right: 8px solid $color-primary-light;
    }

    &::after {
      left: -16px;
      border-right: 8px solid $color-secondary-light;
    }
  }

  &__nav-item {
    margin-bottom: 10px;
  }

  &__controls-wrapper {
    display: flex;
    justify-content: flex-end;
    @media (min-width: $md) {
      margin-bottom: 25px;
    }
  }

  &__controls-icon {
    padding: 0;
  }

  &__link {
    display: flex;
    padding: 10px 15px;
    align-items: center;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 3px;

    &:hover {
      background-color: rgba($color-white, 0.14);
      text-decoration: none;

      .sidebar__link-icon {
        transform: scale(1.25);
      }
    }

    &.router-link-active {
      background-color: rgba($color-white, 0.14);
      box-shadow: inset 3px 0 0 $color-accent;
    }
  }

  &__link-icon {
    display: inline-flex;
    align-self: center;
    justify-content: center;
    margin-right: 7px;
  }
  &__controls-btn {
    display: none;

    @media (min-width: $md) {
      display: flex;
    }
  }

  &__space-name {
    padding: 8px 12px 15px 12px;
    color: $color-tetriary-light;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
}

.sidebar-nav {
  list-style: none;
  padding: 15px 0 0;
  margin: 0 0 15px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  border-top: 1px solid rgba($color-white, 0.15);

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: $sm) {
    flex-direction: column;
  }
}
</style>
