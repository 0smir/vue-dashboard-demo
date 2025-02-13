<template>
  <div class="login-form__wrapper">
    <p v-if="error" class="error">{{ error }}</p>
    <form class="form from--login" @submit.prevent="submitForm">
      <div class="form__content">
        <div :class="['form-control', 'form-control--email', { error: !user.email.isValid }]">
          <label for="email" class="form-control__label">Email</label>
          <input id="email" type="text" autocomplete="off" class="form-control__input" v-model="user.email.value">
          <p v-if="!user.email.isValid" class="error-text"> Please, enter a valid email address</p>
        </div>
        <div :class="['form-control', 'form-control--password', { error: !user.password.isValid }]">
          <label class="form-control__label" for="password">Password:</label>
          <div class="form-control__input-wrapper form-control__input-wrapper--password">
            <input class="form-control__input" :type="showPass ? 'text' : 'password'" id="password"
              v-model.trim="user.password.value" autocomplete="off" />
            <span class="password-visibility-wrapper flex" @click="showPass = !showPass">
              <SvgIcon v-if="!showPass" name="eye" class="icon" />
              <SvgIcon v-else name="eyeSplash" class="icon" />
            </span>
          </div>
          <p v-if="!user.password.isValid" class="error-text"> Password is required and must be at least 8
            characters long.</p>
        </div>
        <div class="form-control__btn-wrapper login-form__btn-wrapper">
          <BaseButton class="btn btn__default btn--medium btn--login">Login</BaseButton>
          <RouterLink class="link link--registration" to="/people/registration" aria-lebel="link to registration page">Registration</RouterLink>
          <RouterLink class="link link--forget-pass" to="/" aria-lebel="link to password recovery page">Forgot password?</RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPass: false,
      isFormValid: true,
      user: {
        email: {
          value: '',
          isValid: true
        },
        password: {
          value: '',
          isValid: true
        }
      },
      error: null
    }
  },
  methods: {
    submitForm() {
      this.clearError();
      this.isFormValid = true;
      if (
        this.user.email.value === '' ||
        !this.user.email.value.includes('@') ||
        this.user.email.value.length < 4
      ) {
        this.user.email.isValid = false;
        this.isFormValid = false;
        return;
      }

      if (this.user.password.value === '' ||
        this.user.password.value.length < 5) {
        this.user.password.isValid = false;
        this.isFormValid = false;
        return;
      }

      const actionPayload = {
        email: this.user.email.value,
        password: this.user.password.value
      };

      this.login(actionPayload);

      this.clearFormFields();
      this.$router.replace('/');
    },

    async login(userData) {
      try {
        await this.$store.dispatch('users/login', userData);
      } catch (error) {
        this.error = error.message || 'Failed to auth!';
      }
    },

    clearFormFields() {
      this.user.email.value = '';
      this.user.password.value = '';
    },

    clearError() {
      this.user.email.isValid = true;
      this.user.password.isValid = true;
    }
  }

}
</script>

<style lang="scss" scoped>
.login-form {
  &__wrapper {
    max-width: 36rem;
  }

  &__btn-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
}

.btn--login {
  width: 100%;
  margin: 20px 0 40px;
}

.link {
  &--registration,
  &--forget-pass {
    color: var(--color-primary);
  }
}
</style>