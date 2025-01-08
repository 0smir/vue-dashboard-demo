<template>
  <div :class="['smart-box', { active: showSmartList }]" @click="toggleSmartList" v-click-outside="closeDropdown">
    <slot name="active-item">
      <BaseButton :class="[classList, 'smart-box__btn', 'smart-box__btn-control']">
        <span>{{ title }}</span>
        <SvgIcon class="icon icon--medium smart-box__btn-icon" name="chevron-down" />
      </BaseButton>
    </slot>
    <ul class="smart-box__list-wrapper" v-show="showSmartList">
      <slot name="list-items" :list="list" :selectItem="selectItem"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['classList', 'list', 'title', 'mode'],
  emits: ['update-params', 'task-interaction'],
  data() {
    return {
      showSmartList: false
    }
  },
  methods: {
    selectItem(item) {
      let payload = {
        newVal: item,
        mode: this.mode
      }

      if (this.mode !== 'actions') {
        this.$emit('update-params', payload);
      } else {
        this.$emit('task-interaction', payload);
      }
      this.toggleSmartList();
    },

    toggleSmartList() {
      this.showSmartList = !this.showSmartList;
    },
    closeDropdown() {
      this.showSmartList = false;
    },
  }
}
</script>

<style lang="scss">
.smart-box {
  position: relative;
  min-width: max(135px, 50%);

  &.active {
    .smart-box__btn-control>.icon {
      transform: rotate(180deg);
    }
  }

  &__list-wrapper {
    z-index: 5;
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
    text-transform: uppercase;
  }

  &__btn-control {

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