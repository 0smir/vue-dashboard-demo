<template>
  <a :href="href" v-if="linkType === 'external'">
    <slot></slot>
  </a>
  <router-link v-else>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['linkType', 'href']

}
</script>

<style scoped></style>