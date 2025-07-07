<template>
  <div>
    Person: {{fullName}}
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      error: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters['users/getUserInfo'];
    },
    fullName() {
      return `${this.userInfo.name} ${this.userInfo.lastName}`;
    }
  },
  methods: {
    async loadUserInfo() {
      try {
        await this.$store.dispatch('users/loadUserData', this.id);
      } catch (error) {
        this.error = error.message || 'Failed to fetch'
      }
    },
  },
  created() {
    this.loadUserInfo();
  }

}
</script>

<style lang="scss" scoped></style>