<template>
  <div class="tabs">
    <BaseButton :class="['tabs__btn', { active: activeItem === 'all' }]" @click="updateFilter('all')">All
    </BaseButton>
    <BaseButton v-for="item in filterItemsList" :key="item" @click="updateFilter(item)"
      :class="['tabs__btn', { active: activeItem === item }]">{{ item }}</BaseButton>
  </div>
</template>

<script>
export default {
  props: ['filterItemsList', 'activeItem'],
  emits: ['on-filter-change'],
  methods: {
    updateFilter(name) {
      console.log(name);
      this.$emit('on-filter-change', name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 20px;
}
</style>