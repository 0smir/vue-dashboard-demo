<template>
  <aside class="sidebar">
    <ul class="sidebar-nav">
      <li class="sidebar-nav__item">
        <router-link to="/"><span class="icon"></span> <span class="sidebar-text">Boards</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link to="/"><span class="icon"></span> <span class="sidebar-text">Statistic</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link to="/"><span class="icon"></span><span class="sidebar-text">Settings</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link to="/tasks"><span class="icon"></span> <span class="sidebar-text">All Tasks</span></router-link>
      </li>
      <li class="sidebar-nav__item">
        <router-link to="/tasks/new">
          <span class="icon"></span> <span class="sidebar-text">Add New Task</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar {
  background-color: #273850;
  width: 200px;
  padding: 10px 15px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav__item {
  margin-bottom: 10px;
}
</style>