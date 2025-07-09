<template>
  <li class="projects__list-item">
    <BaseButton @click="chooseProject"> {{  project.title }}</BaseButton>
  </li>
</template>

<script>
export default {
  props: ['project'],
  emits: ['change-active-project'],
  methods: {
    chooseProject() {
      this.$emit('change-active-project', this.project);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>