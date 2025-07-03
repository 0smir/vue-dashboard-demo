<template>
  <BaseTabs :tabsList="tabsList" :activeItem="activeItem" @choose-item="updateFilter"/>
</template>

<script>
import BaseTabs from '@/components/UI/base-components/BaseTabs.vue';
export default {
  components:{
    BaseTabs
  },
  props: ['filterItemsList', 'activeItem'],
  emits: ['on-filter-change'],

  computed: {
    tabsList() {
      let tabsArray = ['all', ...this.filterItemsList];
      return tabsArray;
    }
  },

  methods: {
    updateFilter(item) {
      this.$emit('on-filter-change', item.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 20px;
  overflow-x: hidden;

  &__list{
    display: flex;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
    margin-right: 5px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>