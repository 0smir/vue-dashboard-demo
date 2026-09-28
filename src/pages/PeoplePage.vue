<template>
  <div class="tabs container">
    <RouterLink
      to="/people/registration"
      :class="['tabs__btn', { active: activeTab === 'registration' }]"
      >{{ $t("common.registration") }}
    </RouterLink>
    <RouterLink to="/people/all" :class="['tabs__btn', { active: activeTab === 'all' }]">{{
      $t("common.see_all")
    }}</RouterLink>
    <div class="tabs__content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import AddPersonForm from '@/components/people/AddPersonForm.vue';
// import PersonsList from '@/components/people/PersonsList.vue';

export default {
  computed: {
    activeTab() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}
</style>
