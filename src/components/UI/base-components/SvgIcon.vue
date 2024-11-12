<template>
  <component :is="icon"></component>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const icon = defineAsyncComponent(() => import(`@/assets/images/icons/${props.name}.svg`));


</script>

<style lang="scss">
.icon {
  width: 24px;
  height: 24px;

  &>svg {
    object-fit: contain;
  }

}
</style>