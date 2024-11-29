<template>
  <h2 class="header header--add-person">Add New User</h2>
  <form @submit.prevent="submitForm" class="form form-add-person">
    <div class="form__content form__content--add-person">
      <div class="form-control form-control--name">
        <label for="name" class="form-control__label">Name: </label>
        <input class="form-control__input" id="name" type="text" v-model="user.name.value">
      </div>
      <div class="form-control form-control--lastname">
        <label for="lastName" class="form-control__label">Last Name:</label>
        <input class="form-control__input" id="lastName" type="text" v-model="user.lastName.value">
      </div>
      <div class="form-control form-control--email">
        <label for="email" class="form-control__label">Email:</label>
        <input class="form-control__input" id="email" type="email" v-model="user.email.value">
      </div>
      <div class="form-control form-control--position">
        <label for="role" class="form-control__label">Position:</label>
        <select class="form-control__select" name="role" id="position" v-model="user.position.value">
          <option value="" disabled selected>Select your Role</option>
          <option class="form-control__select-option" v-for="(role) in positionsList" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="form-control form-control--project">
        <label for="project" class="form-control__label">Project: </label>
        <select class="form-control__select" name="projectName" id="project" v-model="user.project.value">
          <option value="" disabled selected>Select Project</option>
          <option class="form-control__select-option" v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.title }}
          </option>
        </select>
      </div>
      <div class="form-control__btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--add">Add User</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel">Cancel</BaseButton>
      </div>
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
        email: {
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

<style lang="scss" scoped>
.header--add-person {
  margin: 20px 0 40px;
  text-align: center;
  text-transform: uppercase;
}

.form__content--add-person {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 760px;
  margin: 0 auto;
}

.form-control {
  width: calc(50% - 7px);

  &--email {
    width: 100%;
  }
}

.btn {
  &-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;

    @media (min-width: $md) {
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 45px;
    }
  }

  &--add {
    width: 100%;
    margin-bottom: 10px;

    @media (min-width: $md) {
      width: auto;
      order: 2;
      margin-bottom: 0;
    }
  }

  &--cancel {
    width: 100%;

    @media (min-width: $md) {
      margin: 0 10px 0 0;
      width: auto;
    }
  }
}
</style>