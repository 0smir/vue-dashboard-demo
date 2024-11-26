<template>
  <h2>Add User:</h2>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-control">
      <label for="name" class="form-control__label">Name: </label>
      <input class="form-control__input" id="name" type="text" v-model="user.name.value">
    </div>
    <div class="form-control">
      <label for="lastName" class="form-control__label">Last Name:</label>
      <input class="form-control__input" id="lastName" type="text" v-model="user.lastName.value">
    </div>
    <div class="form-control">
      <label for="role" class="form-control__label">Position:</label>
      <select class="form-control__select" name="role" id="position" v-model="user.position.value">
        <option value="" disabled selected>Select your Role</option>
        <option class="form-control__select-option" v-for="(role) in positionsList" :key="role" :value="role">
          {{ role }}
        </option>
      </select>
    </div>
    <div class="form-control">
      <label for="project" class="form-control__label">Project: </label>
      <select class="form-control__select" name="projectName" id="project" v-model="user.project.value">
        <option value="" disabled selected>Select Project Name</option>
        <option class="form-control__select-option" v-for="project in projects" :key="project.id" :value="project.id">
          {{ project.title }}
        </option>
      </select>
    </div>
    <div class="form-control__btn-wrapper">
      <BaseButton class="btn btn__default btn--medium btn--dark">Add User</BaseButton>
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