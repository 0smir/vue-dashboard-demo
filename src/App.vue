<template>
  <div class="layout">
    <TheHeader></TheHeader>
    <div class="layout__content">
        <TheSidebar :isExpanded="isExpanded" @toggle-sidebar="toggleSidebar"></TheSidebar>
        
      <main class="main">
        <BaseBreadcrumb v-if="!withoutBreadcrumbs"></BaseBreadcrumb>
        <router-view></router-view>
      </main>
    </div>

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

<style lang="scss">
.layout {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;

  &__content {
    position: relative;
     display: contents;

    @media (min-width: $sm) {
      display: flex;
      flex-grow: 1;
      width: 100%;
    }
  }
}

.main {
  min-height: calc(100vh - 150px); //100vh - (header + footer)
  width: 100%;
  background-color: $color-main-bg;
  transition: max-width 0.35s ease;

  @media(min-width: $md) {
    padding-left: $asside-width-close;
  }
}

.sidebar.close {
  &~.main {
    transition: width 0.35s ease;
  }
}
</style>