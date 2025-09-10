<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click.self="closeDialog">
      <dialog open v-if="show" class="dialog">
        <BaseButton class="btn btn--small btn__default dialog__btn-close" @click="closeDialog" aria-label="Close">
          <SvgIcon name="close" class="icon" />
        </BaseButton>
        <header class="dialog__header">
          <slot name="header">
            <h2 class="dialog__title">{{ title }}</h2>
          </slot>
        </header>
        <section class="dialog__content">
          <div class="dialog__container">
            <slot></slot>
          </div>
        </section>
      </dialog>
    </div>
  </teleport>
</template>

<script>

export default {
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false
    }
  },
  provide() {
    return {
      closeModal: this.closeDialog
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    }
  }

}
</script>

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}

.dialog {
  position: fixed;
  top: 50%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  max-width:  565px;
  height: 100%;
  max-height: 500px;
  z-index: 100;
  border-radius: $border-radius-large;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: $color-white;
  transform: translateY(-50%);

  &__header {
    background-color: $color-primary;
    color: $color-white;
    padding: 15px 40px 15px 10px;

    @media (min-width: $tablet) {
      padding: 15px 40px 15px 15px; 
    }
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;

    @media (min-width: $sm) {
      font-size: 24px;
    }
    
    @media (min-width: $md) {
      font-size: 28px;
    }

    @media (min-width: $tablet) {
      font-size: 30px;
    }

    &:has(.icon) > .icon {
      margin-right: 7px;
    }
  }

  &__btn-close {
    position: absolute;
    top: 0;
    right: 0;

    @media (min-width: $sm) {
      top: 5px;
      right: 5px;
    }
  }

  &__content {
    overflow-y: auto;
    height: 100%;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 25px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>