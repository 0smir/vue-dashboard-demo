<template>
  <div class="dropdown dropdown__wrapper">
    <BaseButton class="">BTN Title</BaseButton>
    <div class="dropdown__content-wrapper">
      <ul class="dropdown__content-list">
        <li class="dropdown__content-item">
          <slot></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>