<template>
  <div class="tabs container">
    <BaseButton :class="['tabs__btn', { active: activeComponentName === 'AddPersonForm' }]"
      @click="toggleTab('AddPersonForm')">Add New Employee</BaseButton>
    <BaseButton :class="['tabs__btn', { active: activeComponentName === 'PersonsList' }]"
      @click="toggleTab('PersonsList')">All Employees</BaseButton>
    <div class="tabs__content-wrapper">
      <KeepAlive>
        <component :is="activeComponentName" :peopleList="peopleList"></component>
      </KeepAlive>

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
  data() {
    return {
      activeComponentName: 'AddPersonForm',
      peopleList: this.$store.getters['people/getEmployeesList']
    }
  },

  methods: {
    async loadUsersList() {
      this.$store.dispatch('people/loadEmployeesList');
    },
    toggleTab(componentName) {
      if (componentName === 'PersonsList') {
        this.loadUsersList();
        this.peopleList = this.$store.getters['people/getEmployeesList'];
      }
      this.activeComponentName = componentName;
    },

  },

  mounted() {
    if (this.activeComponentName === 'PersonsList') {
      this.loadUsersList();
    }

  }

}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}
</style>