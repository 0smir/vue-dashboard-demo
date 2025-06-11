<template>
  <div v-if="employeesList.length" class="container">
    <h2 class="title page-title">Create new project</h2>
    <CreateProjectForm :employees="employeesList"
    />
  </div>
  <div v-else class="container">
    <BaseSpinner/>
  </div>
</template>

<script>
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
import CreateProjectForm from '@/components/project/CreateProjectForm.vue';
export default {
  components: {
    BaseSpinner,
    CreateProjectForm
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    employeesList() {
      return this.$store.getters['people/getEmployeesList'];
    }
  },
  methods: {
    async loadEmployeesList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('people/loadEmployeesList');
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Smth went wrong, faled to  EmployeesList fetch!';
      }
    }
  },
  created() {
    this.loadEmployeesList();
  }

}
</script>

<style lang="scss" scoped></style>