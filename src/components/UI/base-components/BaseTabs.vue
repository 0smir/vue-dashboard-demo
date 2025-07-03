<template>
  <div class="tabs" ref="tabsContainer">
    <ul class="tabs__list" ref="tabsList">
      <li class="tabs__item" v-for="item in tabsList" :key="item">
         <BaseButton  @click="updateActiveItem(item)"
          :class="['tabs__btn', { active: activeItem === item }]">
          {{ item }}
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['tabsList', 'activeItem'],
  emits:['choose-item'],
  
  methods:{
    updateActiveItem(item) {
      this.$emit('choose-item', { name: item });
    },
    scrollToActiveItem() {
      let targetEl = document.getElementsByClassName('active')[0],
        wrapperWidth = this.$refs.tabsContainer.clientWidth,
        listEl = this.$refs.tabsList,
        position = targetEl.offsetLeft;
        
      listEl.scrollLeft = position - (wrapperWidth / 2);
    }
  },

  watch: {
    activeItem(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.scrollToActiveItem();
      }
    }
  } 
}
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  margin-bottom: 20px;
  overflow-x: hidden;

  &__list{
    display: flex;
    width: 100%;
    overflow: auto;
    scroll-behavior: smooth;
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
  &__controls-btn {
    position: absolute;
    top: 50%; 
    transform: translate(0, -50%);
    &.prev{
      left: 5px;
    }
    &.next{
      right: 5px;
    }
  }
}
</style>