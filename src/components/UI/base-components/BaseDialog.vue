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
  methods: {
    closeDialog() {
      this.$emit('close');
    }
  }

}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.dialog {
  --ColorDialogBG: var(--color-white);
  --ColorDialogRadius: var(--border-radius-large);
  --ColorDialogHeaderBG: var(--color-primary);
  --ColorDialogHeadeText: var(--ColorDialogBG);
  --DialogHeight: 500px;
  --DialogWidth: 565px;

  position: fixed;
  top: 50%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  max-width: var(--DialogWidth);
  height: 100%;
  max-height: var(--DialogHeight);
  z-index: 100;
  border-radius: var(--ColorDialogRadius);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: var(--ColorDialogBG);
  transform: translateY(-50%);

  &__header {
    background-color: var(--ColorDialogHeaderBG);
    color: var(--ColorDialogHeadeText);
    // width: 100%;
    padding: 15px;
  }

  &__title {
    font-size: 22px;
  }

  &__btn-close {
    position: absolute;
    top: 10px;
    right: 15px;
  }

  &__content {
    overflow-y: auto;
    height: 100%;
  }

  &__container {
    padding: 20px 25px;
    overflow-y: auto;
  }
}
</style>