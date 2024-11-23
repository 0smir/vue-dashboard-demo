<template>
  <div class="container">
    <BaseButton :class="['tab__btn', { active: activeComponentName === 'AddPersonForm' }]"
      @click="toggleTab('AddPersonForm')">Add New Employee</BaseButton>
    <BaseButton :class="['tab__btn', { active: activeComponentName === 'PersonsList' }]"
      @click="toggleTab('PersonsList')">All Employees</BaseButton>
    <div class="tab__content-wrapper">
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
      peopleList: []
    }
  },

  methods: {
    async loadUsersList() {
      this.$store.dispatch('people/loadEmployeesList');
    },
    toggleTab(componentName) {
      if (componentName === 'PersonsList') {
        this.peopleList = this.$store.getters['people/getEmployeesList'];
      }
      this.activeComponentName = componentName;
    },

  },

  mounted() {
    this.loadUsersList();
  }

}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}

.tab {
  &__btn {
    position: relative;
    bottom: -1px;
    padding: 10px 5px;
    margin-right: 5px;
    color: var(--color-text);
    background-color: var(--color-board-bg);
    border: 2px solid var(--color-tabs-border);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    &:last-of-type {
      margin-right: 0;
    }

    &.active {
      background-color: var(--color-tabs-bg);
      border-bottom-color: transparent;
    }
  }

  &__content-wrapper {
    padding: 20px 10px;
    min-height: 80vh;
    border: 2px solid var(--color-tabs-border);
    background-color: var(--color-board-bg);
  }
}
</style>