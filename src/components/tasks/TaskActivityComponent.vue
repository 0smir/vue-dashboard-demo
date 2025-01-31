<template>
  <section class="section task-activity__wrapper">
    <h4 class="section__title title">Activity</h4>
    <div class="tabs">
      <span class="tabs__label">Show:</span>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'all' }]" @click="updateFilter('all')">All
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'comments' }]" @click="updateFilter('comments')">Comments
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'history' }]" @click="updateFilter('history')">History
      </BaseButton>
      <BaseButton :class="['tabs__btn', { active: activeItem === 'logWork' }]" @click="updateFilter('logWork')">Work log
      </BaseButton>
    </div>
    <div class="tabs__content">
      <component :is="activeItem"></component>
    </div>
    
  </section>
</template>

<script>
  
export default {
  props: ['activity'],
  data() {
    return {
      activeItem: 'all'
    }
  }
  
}
</script>

<style lang="scss" scoped>
.section {
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  } 
}
.tabs {
  &__label {
    margin-right: 15px;
  }
}
</style>