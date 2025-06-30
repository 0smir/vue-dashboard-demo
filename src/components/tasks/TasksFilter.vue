<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li class="tabs__item"> 
        <BaseButton :class="['tabs__btn', { active: activeItem === 'all' }]" 
                    @click="updateFilter('all')">
                    All
        </BaseButton>
      </li>
      <li class="tabs__item" v-for="item in filterItemsList" :key="item">
         <BaseButton  @click="updateFilter(item)"
          :class="['tabs__btn', { active: activeItem === item }]">
          {{ item }}
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['filterItemsList', 'activeItem'],
  emits: ['on-filter-change'],
  methods: {
    updateFilter(name) {
      this.$emit('on-filter-change', name);
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