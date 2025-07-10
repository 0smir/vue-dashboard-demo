<template>
  <li class="projects__list-item">
    <BaseButton :class="['projects__project-button', {'active': isActive}]" @click="chooseProject">
       <span class="uppercase project-title">{{  project.title }} </span>
       <span :class="['boards-count', {'visually-hidden': boardsCount === 0}]">({{ boardsCount }} boards)</span>
    </BaseButton>
  </li>
</template>

<script>
export default {
  props: ['project', 'isActive'],
  emits: ['change-active-project'],
  computed: {
    boardsCount() {
      return !this.project?.boards ?  0 : this.project?.boards.length;
    }
  },
  methods: {
    chooseProject() {
      this.$emit('change-active-project', this.project);
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  &__list-item {
    display: flex;
    height: 45px;
    @media(min-width: $md) {
      height: auto;
      width: 100%;
    }
  }
  &__project-button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 8px 10px;
    height: 100%;
    border: 1px solid var(--color-primary);
    border-bottom: none;
    border-radius: var(--border-radius-small);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: var(--color-white);
    color: var(--color-primary);
    font-weight: 500;
    font-size: 14px;

    @media(min-width: $md) {
      flex-direction: row;
      padding: 15px;
      width: 100%;
      height: auto;
      border: 1px solid var(--color-primary);
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: var(--border-radius-small);
      font-size: 16px;
    }
    &:hover {
      background-color: var(--color-primary-light);
    }
    &.active {
      height: calc(100% + 1px);
      border: 1px solid var(--color-primary);
      border-bottom: 1px solid transparent;
      background-color: var(--color-primary-light);
      @media(min-width: $md) {
        height: auto;
        right: -1px;
        border: 1px solid var(--color-primary);
        border-right: 1px solid transparent;
        width: calc(100% + 1px);
      }
    }
  }
}
.project-title {
  margin: 0 auto;
}
.boards-count {
  margin-left: auto;
  color: var(--color-tetriary);
  font-size: 10px;
  line-height: 1;
  text-transform: lowercase;
}
</style>