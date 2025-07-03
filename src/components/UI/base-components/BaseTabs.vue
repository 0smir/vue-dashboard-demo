<template>
  <div class="tabs" ref="tabsContainer">
    <ul class="tabs__list" ref="tabsList">
      <li class="tabs__item"> 
        <BaseButton :class="['tabs__btn', { active: activeItem === 'all' }]" 
                    @click="updateFilter('all')">
                    All
        </BaseButton>
      </li>
      <li class="tabs__item" v-for="item in tabsList" :key="item">
         <BaseButton  @click="updateFilter(item)"
          :class="['tabs__btn', { active: activeItem === item }]">
          {{ item }}
        </BaseButton>
      </li>
    </ul>
    <BaseButton v-if="isTabControlsVisible && isLeftControlVisible" class="btn btn__default btn--small tabs__controls-btn prev">
      <SvgIcon class="icon icon--small" name="chevronLeft" />
    </BaseButton>
    <BaseButton v-if="isTabControlsVisible && isRightControlVisible" class="btn btn__default btn--small tabs__controls-btn next">
      <SvgIcon class="icon icon--small" name="chevronRight" />
    </BaseButton>
  </div>
</template>

<script>
export default {
  props: ['tabsList', 'activeItem'],
  data(){
    return{
      isTabControlsVisible: false,
      isLeftControlVisible: false,
      isRightControlVisible: true
    }
  },
  
  methods:{
    tabControlsDisplay(){
      let blockWrapper = this.$refs.tabsContainer,
          listWrapper = this.$refs.tabsList;
      let show = blockWrapper.offsetWidth < listWrapper.scrollWidth;
      console.log(this.$refs.tabsContainer.offsetWidth);
      console.log(this.$refs.tabsList.scrollWidth);
      console.log(show);
      this.isTabControlsVisible = show;
    }
  },
  mounted(){
    this.tabControlsDisplay();
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