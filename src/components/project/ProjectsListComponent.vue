<template>
  <li class="projects__list-item">
    <BaseButton :class="['projects__project-button', {'active': isActive}]" @click="chooseProject"> {{  project.title }}</BaseButton>
  </li>
</template>

<script>
export default {
  props: ['project', 'isActive'],
  emits: ['change-active-project'],
  methods: {
    chooseProject() {
      this.$emit('change-active-project', this.project);
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  &__list-item{
   margin-bottom: 10px;
  }
  &__project-button {
    position: relative;
    width: 100%;
    padding: 15px;
    border: 1px solid var(--color-primary);
    border-right: none;
    border-radius: var(--border-radius-small);
    background-color: var(--color-white);
    color: var(--color-primary);
    font-weight: 700;
    text-transform: uppercase;
    &:hover{
      background-color: var(--color-primary-light);
    }
    &.active {
      border: 3px solid var(--color-primary);
      border-right: 3px solid white;
      width: calc(100% + 3px);
    }
  }
}
</style>