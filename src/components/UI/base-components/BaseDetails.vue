<template>
  <details>
    <summary>
      <slot name="summary"></slot>
      <SvgIcon class="icon" name="chevron-down" />
    </summary>
    <div class="details__content">
      <slot name="details"></slot>
    </div>
  </details>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>