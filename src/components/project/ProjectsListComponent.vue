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
  &__list-item{
   margin-bottom: 10px;
  }
  &__project-button {
    position: relative;
    display: flex;
    align-items: baseline;
    width: 100%;
    padding: 15px;
    border: 1px solid var(--color-primary);
    border-right: none;
    border-radius: var(--border-radius-small);
    background-color: var(--color-white);
    color: var(--color-primary);
    font-weight: 700;
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