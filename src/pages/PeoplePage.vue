<template>
  <div class="tabs container">
    <RouterLink to="/people/registration" :class="['tabs__btn', { active: activeTab === 'registration' }]"
      @click="toggleTab('AddPersonForm')">Add New Employee</RouterLink>
    <RouterLink to="/people/all" :class="['tabs__btn', { active: activeTab === 'all' }]"
      @click="toggleTab('PersonsList')">All Employees</RouterLink>
    <div class="tabs__content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AddPersonForm from '@/components/people/AddPersonForm.vue';
import PersonsList from '@/components/people/PersonsList.vue';

export default {
  components: {
    AddPersonForm,
    PersonsList
  },

  computed: {
    activeTab() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}
</style>