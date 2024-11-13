<template>
  <button :mode="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode']

}
</script>

<style scoped>
button {
  /* padding: 15;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer; */
}

button:active button:hover {
  /* background-color: #270041;
  border-color: #270041; */
}
</style>