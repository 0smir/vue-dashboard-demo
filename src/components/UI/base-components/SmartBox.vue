<template>
  <div class="smart-box">
    <BaseButton :class="[classList, 'smart-box__btn']" @click="toggleDropdown">
      <span>{{ activeItem }}</span>
      <SvgIcon v-if="!showSmartList" class="icon" name="chevron-down" />
      <SvgIcon v-else class="icon" name="chevron-up" />
    </BaseButton>
    <ul class="smart-box__list-wrapper" v-show="showSmartList">
      <li class="smart-box__list-item" v-for="item in list" :key="item" @click="selectItem(item)">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['classList', 'list', 'activeItem'],
  emits: ['update-status'],
  data() {
    return {
      showSmartList: false
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('update-status', item);
      this.toggleDropdown();
    },
    toggleDropdown() {
      this.showSmartList = !this.showSmartList;
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-box {
  position: relative;

  &__list-wrapper {
    position: absolute;
    top: calc(100% + 5px);
    padding: 5px;
    width: 100%;
    list-style: none;
    background: var(--color-white);
    border: 1px solid var(--color-secondary-medium);
    border-radius: var(--border-radius-medium);
  }

  &__list-item {
    padding: 5px 0 5px 5px;
    border-radius: var(--border-radius-small);

    &:hover {
      background-color: var(--color-secondary-light);
    }
  }

  &__btn {
    span {
      margin: 0 auto;
    }
  }
}
</style>