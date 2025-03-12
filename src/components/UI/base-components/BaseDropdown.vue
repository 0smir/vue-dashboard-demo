<template>
 <div class="dropdown dropdown__wrapper" v-click-outside="closeDropdown">
    <BaseButton 
      class="btn btn__default btn--medium dropdown__btn" 
      :class="{ active: isDropdownOpen }"
      aria-label="Close"
      type="button"
      @click="toggleDropdown"
    >
      <span>{{ placeholder }}</span>
      <SvgIcon class="icon icon--small icon-chevron" name="chevron-down" />
    </BaseButton>

    <div v-show="isDropdownOpen" class="dropdown__content-wrapper">
      <ul class="dropdown__content-list">
        <slot></slot> <!-- Child component content here -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String
  },
  data() {
    return {
      isDropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    }
  }
};
</script>

<style lang="scss">
.dropdown{
  &__wrapper {
    position: relative;
    margin-right: 15px;
  }
  &__content-wrapper {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 
                0 3px 1px -2px rgba(0,0,0,.2), 
                0 1px 5px 0 rgba(0,0,0,.12);
    position: absolute;
    top: calc(100% + 5px);
    z-index: 10;
    padding: 5px;
    min-width: 100%;
    background-color: var(--color-white);
    border-radius: var(--border-radius-medium);
    border: 1px solid var(--color-secondary-medium);
  }

  &__content-list {
    padding-right: 5px;
    max-height: 250px;
    overflow-x: hidden;
  }

  &__content-item {
    display: flex;
    align-items: center;
    padding: 3px 5px;
    border-radius: var(--border-radius-small);
    margin-bottom: 10px;

    &:last-of-type {
      margin: 0;
    }

    &:hover,
    &:focus,
    &:has(:focus) {
      background-color: var(--color-secondary-light);
    }
  }
  &__btn {
    span {
      margin-right: 5px;
    }
  }
  &__btn.active {
    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>