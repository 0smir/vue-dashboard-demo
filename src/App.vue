<template>
  <div class="layout">
    <TheHeader></TheHeader>
    <TheSidebar></TheSidebar>
    <main>
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
  }

}
</script>

<style lang="scss"></style>