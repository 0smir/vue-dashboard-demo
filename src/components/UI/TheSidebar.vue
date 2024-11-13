<template>
  <aside :class="['sidebar', { open: isExpanded, close: !isExpanded }]">
    <div class="sidebar__controls-wrapper">
      <BaseButton class="btn" :alt="sidebarControlAltText" @click="toggleSidebar">
        <span class="sidebar-nav__icon">
          <SvgIcon v-if="!isExpanded" name="chevronLeft" class="icon sidebar__control-icon" />
          <SvgIcon v-else name="chevronRight" class="icon sidebar__control-icon" />
        </span>
      </BaseButton>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav__item">
        <router-link class="sidebar-nav__link" to="/">
          <span class="sidebar-nav__icon">
            <SvgIcon name="board" class="icon" />
          </span>
          <span class="sidebar__link-text">Boards</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar-nav__link" to="/">
          <span class="sidebar-nav__icon">
            <SvgIcon name="statistic" class="icon" />
          </span>
          <span class="sidebar__link-text">Statistic</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar-nav__link" to="/">
          <span class="sidebar-nav__icon">
            <SvgIcon name="settings" class="icon" />
          </span>
          <span class="sidebar__link-text">Settings</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar-nav__link" to="/tasks">
          <span class="sidebar-nav__icon">
            <SvgIcon name="tasks" class="icon" />
          </span>
          <span class="sidebar__link-text">All Tasks</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link class="sidebar-nav__link" to="/tasks/new">
          <span class="sidebar-nav__icon">
            <SvgIcon name="add" class="icon" />
          </span>
          <span class="sidebar__link-text">Add New Task</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: true
    }
  },

  computed: {
    sidebarControlAltText() {
      return this.isExpanded ? 'expanded' : 'collapsed';
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    }
  }

}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #273850;

  padding: 10px 15px;

  &.close {
    width: 60px;
    translate: 'width' 0.35s ease;

    .sidebar__link-text {
      display: none;
    }
  }

  &.open {
    width: 200px;
    translate: 'width' 0.35s ease;

    .sidebar__link-text {
      display: inline;
    }
  }

  &__controls-wrapper {
    margin-bottom: 25px;
  }

  &__control-icon {
    // width: 15px;
    // height: 15px;
  }
}



.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    margin-bottom: 10px;
  }

  &__link {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  &__link:hover {
    .sidebar-nav__icon {
      transform: scale(1.25);
    }
  }

  &__icon {
    margin-right: 7px;
  }

}
</style>