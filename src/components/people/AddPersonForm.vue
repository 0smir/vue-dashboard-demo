<template>
  <h2 class="header header--add-person">Registration</h2>
  <p v-if="error" class="error">{{ error }}</p>
  <form @submit.prevent="submitForm" class="form form-add-person" autocomplete="off">
    <div class="form__content form__content--add-person">
      <div :class="['form-control', 'form-control--name', { error: !user.name.isValid }]">
        <label for="name" class="form-control__label">Name: </label>
        <input class="form-control__input" id="name" type="text" v-model="user.name.value">
        <p class="error-text" v-if="!user.name.isValid">{{ user.name.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--lastname', { error: !user.lastName.isValid }]">
        <label for="lastName" class="form-control__label">Last Name:</label>
        <input class="form-control__input" id="lastName" type="text" v-model="user.lastName.value">
        <p class="error-text" v-if="!user.lastName.isValid">{{ user.lastName.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--position', { error: !user.position.isValid }]">
        <label for="role" class="form-control__label">Position:</label>
        <select class="form-control__select" name="role" id="position" v-model="user.position.value">
          <option value="" disabled selected>Select your Role</option>
          <option class="form-control__select-option" v-for="(role) in positionsList" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
        <p class="error-text" v-if="!user.position.isValid">{{ user.position.errorMessage }}</p>
      </div>
      <!-- <div :class="['form-control', 'form-control--project', { error: !user.project.isValid }]">
        <label for="project" class="form-control__label">Project: </label>
        <select class="form-control__select" name="projectName" id="project" v-model="user.project.value">
          <option value="" disabled selected>Select Project</option>
          <option class="form-control__select-option" v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.title }}
          </option>
        </select>
        <p class="error-text" v-if="!user.project.isValid">{{ user.project.errorMessage }}</p>
      </div> -->
      <div :class="['form-control', 'form-control--email', { error: !user.email.isValid }]">
        <label for="email" class="form-control__label">Email:</label>
        <input class="form-control__input" id="email" autocomplete="off" type="email" v-model="user.email.value">
        <p class="error-text" v-if="!user.email.isValid">{{ user.email.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--password', { error: !user.password.isValid }]">
        <label class="form-control__label" for="password">Password:</label>
        <div class="form-control__input-wrapper form-control__input-wrapper--password">
          <input class="form-control__input" :type="showPass ? 'text' : 'password'" id="password"
            v-model.trim="user.password.value" autocomplete="off" />
          <span class="password-visibility-wrapper flex" @click="showPass = !showPass">
            <SvgIcon v-if="showPass" name="eye" class="icon" />
            <SvgIcon v-else name="eyeSplash" class="icon" />
          </span>
          <p class="error-text" v-if="!user.password.isValid">{{ user.password.errorMessage }}</p>
        </div>
      </div>
      <div :class="['form-control', 'form-control--password', { error: !user.confirm_password.isValid }]">
        <label class="form-control__label" for="confirm_password">Confirm Password:</label>
        <div class="form-control__input-wrapper form-control__input-wrapper--password">
          <input class="form-control__input" :type="showConfirmPass ? 'text' : 'password'" name="confirm_password"
            id="confirm_password" v-model.trim="user.confirm_password.value" @keyup="comparePasswords"
            autocomplete="off" />
          <span class="password-visibility-wrapper" @click="showConfirmPass = !showConfirmPass">
            <SvgIcon v-if="showConfirmPass" name="eye" class="icon" />
            <SvgIcon v-else name="eyeSplash" class="icon" />
          </span>
          <p class="error-text" v-if="!user.confirm_password.isValid">{{ user.confirm_password.errorMessage }}</p>
        </div>
      </div>
      <div class="form-control__btn-wrapper btn-wrapper">
        <RouterLink class="link link--login" to="/login" aria-lebel="link to login page">Go to Login page?</RouterLink>
        <BaseButton class="btn btn__default btn--medium btn--add" aria-label="click to add user">Add User</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel" aria-label="click to cencel">Cancel</BaseButton>
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
      showPass: false,
      showConfirmPass: false,
      error: null,
      user: {
        name: {
          value: '',
          isValid: true,
          errorMessage: 'Name is requiered! It must be at least 2 characters long.'
        },
        lastName: {
          value: '',
          isValid: true,
          errorMessage: 'Last name is requiered! It must be at least 2 characters long.'
        },
        position: {
          value: '',
          isValid: true,
          errorMessage: 'Please select your position from the list.'
        },
        // project: {
        //   value: '',
        //   isValid: true,
        //   errorMessage: 'Project assignment is required to proceed.'
        // },
        email: {
          value: '',
          isValid: true,
          errorMessage: 'Please enter a valid email address (e.g., name@example.com).'
        },
        password: {
          value: '',
          isValid: true,
          errorMessage: 'Password must be at least 5 characters long.'
        },
        confirm_password: {
          value: '',
          isValid: true,
          errorMessage: 'Passwords do not match. Please try again.'
        }
      },
      isFormValid: true
    }
  },

  methods: {
    validateForm() {
      this.clearError();
      this.isFormValid = true;

      if (this.user.name.value === '' || this.user.name.value.length < 2) {
        this.user.name.isValid = false;
        this.user.name.errorMessage = this.user.name.errorMessage;
        this.isFormValid = false;
        return;
      }
      if (this.user.lastName === '' || this.user.lastName.value.length < 2) {
        this.user.lastName.isValid = false;
        this.user.name.errorMessage = this.user.lastName.errorMessage;
        this.isFormValid = false;
        return;
      }
      if (this.user.position.value === '') {
        this.user.position.isValid = false;
        this.user.position.errorMessage = this.user.position.errorMessage;
        this.isFormValid = false;
        return;
      }
      // if (this.user.project.value === '') {
      //   this.user.project.isValid = false;
      //   this.user.project.errorMessage = this.user.project.errorMessage;
      //   this.isFormValid = false;
      //   return;
      // }
      if (
        this.user.email.value === '' ||
        !this.user.email.value.includes('@') ||
        this.user.email.value.length < 4
      ) {
        this.user.email.isValid = false;
        this.user.email.errorMessage = this.user.email.errorMessage;
        this.isFormValid = false;
        return;
      }
      if (this.user.password.value === '' ||
        this.user.password.value.length < 5) {
        this.user.password.isValid = false;
        this.user.password.errorMessage = this.user.password.errorMessage;
        this.isFormValid = false;
        return;
      }

      if (!this.user.confirm_password.isValid) {
        return;
      }
    },
    comparePasswords(e) {
      let confirmPassVal = e.target.value;

      if (confirmPassVal !== this.user.password.value) {
        this.user.confirm_password.isValid = false;
        this.isFormValid = false;
      } else {
        this.user.confirm_password.isValid = true;
        this.isFormValid = true;
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
        name: this.user.name.value,
        lastName: this.user.lastName.value,
        position: this.user.position.value,
        // project: this.user.project.value,
        email: this.user.email.value,
        password: this.user.password.value
      }
      this.registratePerson(userData);
    },

    async registratePerson(personInfo) {
      try {
        await this.$store.dispatch('users/signup', personInfo);
      }
      catch (error) {
        this.error = error.message || 'Failed with signup';
      }
    },

    clearFormFields() {
      this.user.name.value = '';
      this.user.lastName.value = '';
      this.user.position.value = '';
      // this.user.project.value = '';
      this.user.email.value = '';
      this.user.password.value = '';
      this.user.confirm_password.value = '';
    },

    clearError() {
      this.user.name.isValid = true;
      this.user.lastName.isValid = true;
      this.user.position.isValid = true;
      // this.user.project.isValid = true;
      this.user.email.isValid = true;
      this.user.password.isValid = true;
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

  .form-control {
    width: 100%;

    @media (min-width: $md) {
      width: calc(50% - 7px);

      // &--email {
      //   width: 100%;
      // }
    }
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
      align-items: flex-end;
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

.btn-wrapper {
  .link--login {
    display: flex;
    color: var(--color-primary);
    margin-bottom: 25px;

    @media (min-width: $md) {
      order: -1;
      margin: 0 auto 0 0;
    }
  }
}

</style>