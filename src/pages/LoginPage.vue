<template>
  <div class="container">
    <div class="registration-logo__wrapper">
      <SvgIcon name="logo" class="icon icon--logo registration-logo__icon" />
    </div>
    <h2 class="title">Login</h2>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
export default {
  components: {
    LoginForm
  }

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.registration-logo {
  &__wrapper {
    margin-bottom: 25px;
  }

  &__icon {
    color: var(--color-primary);
    width: 75px;
    height: 75px;
  }
}


.title {
  margin-bottom: 0;
  text-align: center;
}
</style>