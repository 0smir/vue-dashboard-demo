<template>
  <aside :class="['sidebar', { open: isExpanded, close: !isExpanded }]">
    <div class="sidebar__controls-wrapper">
      <BaseButton class="btn btn__default btn--small sidebar__controls-btn" :alt="sidebarControlAltText"
      :aria-label="sidebarControlAltText"
        @click="toggleSidebar">
        <SvgIcon v-if="isExpanded" name="chevronLeft" class="icon sidebar__controls-icon" />
        <SvgIcon v-else name="chevronRight" class="icon sidebar__controls-icon" />
      </BaseButton>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/" title="Boards" aria-label="link to: Boards">
          <span class="sidebar__link-icon">
            <SvgIcon name="board" class="icon" />
          </span>
          <span class="sidebar__link-text">Boards</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/" title="Statistic" aria-label="link to: Statistic">
          <span class="sidebar__link-icon">
            <SvgIcon name="statistic" class="icon" />
          </span>
          <span class="sidebar__link-text">Statistic</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/" title="Settings" aria-label="link to: Settings">
          <span class="sidebar__link-icon">
            <SvgIcon name="settings" class="icon" />
          </span>
          <span class="sidebar__link-text">Settings</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/tasks" title="All Tasks" aria-label="link to: All Tasks">
          <span class="sidebar__link-icon">
            <SvgIcon name="tasks" class="icon" />
          </span>
          <span class="sidebar__link-text">All Tasks</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/people" title="People" aria-label="link to: People">
          <span class="sidebar__link-icon">
            <SvgIcon name="users" class="icon" />
          </span>
          <span class="sidebar__link-text">People</span></router-link>
      </li>
      <li v-if="isLoggedIn" class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/create" title="Create" aria-label="link to: Create page">
          <span class="sidebar__link-icon">
            <SvgIcon name="add" class="icon" />
          </span>
          <span class="sidebar__link-text">Create</span>
        </router-link>
      </li>
      <li v-else class="sidebar-nav__item">
        <router-link class="sidebar__link" to="/people/registration" title="SignIn" aria-label="link to: SignIn">
          <span class="sidebar__link-icon">
            <SvgIcon name="addperson" class="icon" />
          </span>
          <span class="sidebar__link-text">SignIn</span>
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
      default: false
    }
  },
  emits: ['toggle-sidebar'],

  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    sidebarControlAltText() {
      return this.isExpanded ? 'expanded' : 'collapsed';
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  }

}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  color: $color-text;
  background-color: $color-primary;
  padding: 10px 15px;
  
  @media(min-width: $md) {
    position: absolute;
    z-index: 10;
  }

  @media print {
    display: none;
  }

  &.close {
    width: 100%;
    transition: all 0.35s ease;
    @media(min-width: $sm) {
      width: 75px;
    }
    .sidebar__controls-wrapper {
      justify-content: center;
    }

    .sidebar__link {
      justify-content: center;
    }

    .sidebar__link-icon {
      margin-right: 0;
    }

    .sidebar__link-text {
      display: none;
    }
  }

  &.open {
    width: 200px;
    transition: all 0.35s ease;

    .sidebar__link-text {
      display: inline;
    }
  }

  &__controls-wrapper {
    display: flex;
    justify-content: flex-end;
    @media(min-width: $md) {
      margin-bottom: 25px;
    }
  }

  &__controls-icon {
    padding: 0;
  }

  &__link {
    display: flex;
    padding: 10px 5px;
    align-items: center;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 3px;

    &:hover {
      background-color: $color-primary-medium;
      text-decoration: none;

      .sidebar__link-icon {
        transform: scale(1.25);
      }
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

  @media(min-width: $md) {
    display: flex;
  }
 }
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  
  @media(min-width: $sm) {
    flex-direction: column;
  }
}
</style>