<template>
  <component :is="icon"></component>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  iconType: {
    type: String,
    required: false
  }
});
let icon = null;
if (props.iconType) {
  icon = defineAsyncComponent(() => import(`@/assets/images/icons/${props.iconType}/${props.name}.svg`));
} else {
  icon = defineAsyncComponent(() => import(`@/assets/images/icons/${props.name}.svg`));
}



</script>

<style lang="scss">
.icon {
  width: 24px;
  height: 24px;
  pointer-events: none;

  &--medium {
    width: 18px;
    height: 18px;
  }

  &>svg {
    object-fit: contain;
  }

  &--logo {
    transform: rotate(45deg);
  }

}
</style>