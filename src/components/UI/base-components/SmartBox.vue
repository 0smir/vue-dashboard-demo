<template>
  <div class="smart-box" @mouseover="onHover" @mouseleave="onLeave" @touchstart="onHover" @touchend="onLeave">
    <BaseButton :class="[classList, 'smart-box__btn', 'smart-box__btn-control']">
      <span>{{ title }}</span>
      <SvgIcon class="icon icon--medium smart-box__btn-icon" name="chevron-down" />
    </BaseButton>

    <ul class="smart-box__list-wrapper" v-show="showSmartList">
      <li class="smart-box__list-item" v-for="item in list" :key="item" @click="selectItem(item)">
        <BaseButton class="btn btn--transparent smart-box__btn smart-box__btn-action">
          <span class="btn-text">{{ item }}</span>
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['classList', 'list', 'title', 'mode'],
  emits: ['update-status'],
  data() {
    return {
      showSmartList: false
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('update-status', item);
      this.showSmartList = !this.showSmartList;
    },

    onHover() {
      this.showSmartList = true;
    },
    onLeave() {
      this.showSmartList = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.smart-box {
  position: relative;

  &:hover,
  &:focus-within {
    .smart-box__btn-control>.icon {
      transform: rotate(180deg);
    }
  }

  &__list-wrapper {
    z-index: 5;
    position: absolute;
    top: calc(100% - 4px);
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
    text-transform: uppercase;
  }

  &__btn-control {
    margin-bottom: 10px;

    span {
      margin: 0 auto;
    }
  }

  &__btn-action {
    width: 100%;
    justify-content: flex-start;
  }

}
</style>