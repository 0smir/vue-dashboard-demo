<template>
  <div v-if="mode === 'columns'" class="filter-params__block columns-list">
    <div v-for="option in options" :class="['filter-params__item filter-params__item--column', option == 'Active' ? 'active-status' : option.toLowerCase() ]" :title="option">
      {{ option }}
      <BaseButton class="filter-params__btn-remove btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove column ${option}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
  <div v-if="mode === 'persons'" class="filter-params__block people-list">
    <div v-for="option in options" class="filter-params__item filter-params__item--people">
      <UserProfileInfo :userInfo="option" theme="light" :showName="false" size="medium"/>
      <BaseButton class="filter-params__btn-remove btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove person ${option.name} ${option.lastname}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
  <div v-if="mode === 'priority'" class="filter-params__block columns-priority">
    <div v-for="option in options" class="filter-params__item filter-params__item--priority">
      <TaskPriorityElement :priority="option" :titleDisplay="true" />
      <BaseButton class="filter-params__btn-remove btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove priority item ${option}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import UserProfileInfo from '@/components/auth/UserProfileInfo.vue';
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';

export default {
  components: {
    UserProfileInfo,
    TaskPriorityElement
  },
  emits:['remove-filter-item'],
  props: ['options', 'mode'],
  methods: {
    removeItem(option, mode) {
      let params = {
        option, mode
      }
      this.$emit('remove-filter-item', params);
    }
  }
    
}
</script>

<style lang="scss" scoped>
.filter-params {
  &__block {
    display: flex;
    margin-bottom: 10px;
    width: 100%;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &.people-list {
    display: flex;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    transition: transform .25s ease;

    &:has(.btn-remove:hover){
      transform: scale(1.02);
      transition: transform .25s ease;
    }
  }

  &__item--column {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    padding: 3px 7px;
    color: var(--color-text);
    border-radius: var(--border-radius-large);
    
    .btn-remove {
      &:hover  {
        background-color: rgba(#fff, .3);
      }
    }
  }

  &__item--people {
    position: relative;
    padding: 0 5px 5px 0;

    .btn-remove {
      position: absolute;
      top: 0;
      right: 0;
      margin-left: 0;
      border: 1px solid var(--color-secondary);
      background-color: var(--color-white);
      
      &:hover,
      &:has(:focus) {
        background-color: var(--color-tetriary-light);
      }
      .icon {
        fill: var(--color-secondary);
      }
    }
  }
  &__item--priority {
    margin-right: 10px; 
    padding: 2px;
    border: 1px solid var(--color-tetriary-light);
    border-radius: var(--border-radius-medium);
    transition: border-color 0.25s ease;

    &:hover,
    &:focus {
      border: 1px solid var(--color-secondary);
      transition: border-color 0.25s ease;
    }

    .btn-remove {
      border: 1px solid var(--color-secondary);
      background-color: var(--color-white);

      &:hover,
      &:has(:focus) {
        background-color: var(--color-tetriary-light);
      }
    }
    .icon {
      fill: var(--color-secondary);
    }
  }

  &__btn-remove {
    display: flex;
    justify-content: center;
    margin-left: 6px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--color-white);
    background: transparent;
  }
}
</style>