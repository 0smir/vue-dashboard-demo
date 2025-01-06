<template>
  <div class="layout">
    <TheHeader></TheHeader>
    <TheSidebar :isExpanded="isExpanded" @toggle-sidebar="toggleSidebar"></TheSidebar>
    <main class="main">
      <router-view></router-view>
    </main>
    <TheFooter></TheFooter>
  </div>

</template>

<script>
import TheHeader from '@/components/UI/TheHeader.vue';
import TheFooter from '@/components/UI/TheFooter.vue';
import TheSidebar from '@/components/UI/TheSidebar.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheSidebar
  },

  data() {
    return {
      isExpanded: false
    }
  },

  computed: {
    didAutologout() {
      return this.$store.getters['users/getAutoLogoutInfo'];
    }
  },

  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    }
  },

  mounted() {
    this.$store.dispatch('users/autoLogin');
  },

  watch: {
    didAutologout(value, oldValue) {
      if (value && value !== oldValue) {
        this.$router.replace('/login');
      }
    }
  }
}
</script>

<style lang="scss"></style>