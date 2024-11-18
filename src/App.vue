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
      isExpanded: true
    }
  },

  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style lang="scss"></style>