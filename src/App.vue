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

<style>
.layout {
  display: flex;
  flex-wrap: wrap;
}

.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 15px;
}

main {
  height: 100%;
  min-height: 100vh;
  background-color: #465370;
  width: calc(100% - 200px);
}
</style>