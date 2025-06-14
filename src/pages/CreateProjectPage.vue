<template>
  <div class="container" v-if="!isProjCreationSuccess">
    <div v-if="employeesList.length">
      <h2 class="title page-title">Create new project</h2>
      <CreateProjectForm :employees="employeesList" @on-project-create="projectCreated"
      />
    </div>
    <div v-else>
      <BaseSpinner/>
    </div>
  </div>
  <div v-else class="container">
    <BaseSuccessMessage :options="successOptions"/>
  </div>
</template>

<script>
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
import CreateProjectForm from '@/components/project/CreateProjectForm.vue';
import BaseSuccessMessage from '@/components/UI/base-components/BaseSuccessMessage.vue';

export default {
  components: {
    BaseSpinner,
    CreateProjectForm,
    BaseSuccessMessage
  },
  data() {
    return {
      isLoading: false,
      isProjCreationSuccess: false,
      successOptions: {
        type: 'project',
        title: '',
        id: ''
      }
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
    },
    projectCreated(options) {
      console.log(options);
      let { created, projParams } = options;
      
      this.isProjCreationSuccess = created;
      this.successOptions = Object.assign(this.successOptions, projParams);
    }
  },
  created() {
    this.loadEmployeesList();
  }

}
</script>

<style lang="scss" scoped></style>