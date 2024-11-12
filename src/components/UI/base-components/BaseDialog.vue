<template>
  <teleport to="body">
    <div v-if="show" class="backdrop">
      <dialog open v-if="show">
        <div class="close-btn-wrapper">
          <BaseButton class="btn-close" @click="closeDialog" text-area="Close">
            <SvgIcon name="close" class="icon" />
          </BaseButton>
        </div>
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
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

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}
</style>