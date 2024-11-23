<template>
  <h2>Add User:</h2>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="name">Name: </label>
      <input id="name" type="text" v-model="user.name.value">
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input id="lastName" type="text" v-model="user.lastName.value">
    </div>
    <div class="form-control">
      <label for="role">Position:</label>
      <select name="role" id="position" v-model="user.position.value">
        <option v-for="role in positionsList" :value="role">{{ role }}</option>
      </select>
    </div>
    <div class="form-control">
      <label for="project">Project</label>
      <select name="projectName" id="project" v-model="user.project.value">
        <option v-for="project in projects" :value="project.id">{{ project.title }}</option>
      </select>
    </div>
    <div class="form-control__btn-wrapper">
      <BaseButton class="btn btn--medium btn--dark">Add User</BaseButton>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      positionsList: this.$store.getters['people/getPositionsList'],
      projects: this.$store.getters['projects/getProjects'],
      user: {
        name: {
          value: '',
          isValid: true
        },
        lastName: {
          value: '',
          isValid: true
        },
        position: {
          value: '',
          isValid: true
        },
        project: {
          value: '',
          isValid: true
        }
      },
      isFormValid: true
    }
  },

  methods: {
    validateForm() {
      this.isFormValid = true;
      if (this.user.name.value.length < 2) {
        this.user.name.isValid = false;
        this.isFormValid = false;
      }
      if (this.user.lastName.value.length < 2) {
        this.user.lastName.isValid = false;
        this.isFormValid = false;
      }
      if (this.user.position.value.length === '') {
        this.user.position.isValid = false;
        this.isFormValid = false;
      }
      if (this.user.project.value.length === '') {
        this.user.project.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.isFormValid) return;
      this.addUser();
      this.clearFormFields();
    },
    addUser() {
      let userData = {
        id: 'u-' + new Date().getTime(),
        name: this.user.name.value,
        lastName: this.user.lastName.value,
        position: this.user.position.value,
        project: this.user.project.value
      }
      this.$store.dispatch('people/addEmployee', userData);
    },
    clearFormFields() {
      this.user.name.value = '';
      this.user.lastName.value = '';
      this.user.position.value = '';
      this.user.project.value = '';
    }
  }

}
</script>

<style lang="scss" scoped></style>