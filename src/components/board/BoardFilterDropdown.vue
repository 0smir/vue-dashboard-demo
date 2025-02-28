<template>
  <div class="dropdown dropdown__wrapper" v-click-outside="closeDropdown">
    <slot name="action-block">
      <BaseButton :class="['btn btn__default btn--medium dropdown__btn', {active: isDropdownOpen}]" @click="toggleDropdown">
        <span>{{ placeholder }}</span>
        <SvgIcon class="icon icon--small icon-chevron" name="chevron-down" />
      </BaseButton>
    </slot>
   
    <div v-show="isDropdownOpen" class="dropdown__content-wrapper">
      <ul class="dropdown__content-list">
        <li class="dropdown__content-item" >
          <template v-if="mode === 'columns'" v-for="item in options">
            <label  :class="['filter__label', item == 'Active' ? 'active-status' : item.toLowerCase() ]" :for="item || item.id">
            <span class="filter__input-indicator">
              <input class="filter__input" type="checkbox" :key="item.id || item" :id="item || item.id" :value="item"
                v-model="selectedValues">
              <SvgIcon name="checkCircle" class="icon" />
            </span>
            <span class="filter__label-text">{{ item.name ? item.name + ' ' + item.lastName : item }}</span>
          </label>
          </template>
          
          <template v-if="mode === 'priority'"  v-for="item in options">
            <label  class="filter__label" :for="item || item.id">
            <span class="filter__input-indicator">
              <input class="filter__input" type="checkbox" :key="item.id || item" :id="item || item.id" :value="item"
                v-model="selectedValues">
              <SvgIcon name="checkCircle" class="icon" />
            </span>
            <TaskPriorityElement :priority="item" :titleDisplay="true" />
            </label>
          </template>

          <template v-if="mode === 'person'"  v-for="item in options">
            <label  class="filter__label" :for="item || item.id">
            <span class="filter__input-indicator">
              <input class="filter__input" type="checkbox" :key="item.id || item" :id="item || item.id" :value="item"
                v-model="selectedValues">
              <SvgIcon name="checkCircle" class="icon" />
            </span>
            {{ item.name }}
            </label>
          </template>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';

export default {
  components: {
    TaskPriorityElement
  },
  props: ['options', 'placeholder', 'modelValue', 'mode'],
  data() {
    return {
    isDropdownOpen: false
   } 
  },
  computed: {
    selectedValues: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    }
  }

}
</script>

<style lang="scss">
.dropdown{
  &__wrapper {
    position: relative;
  }
  &__content-wrapper {
    position: absolute;
    top: 100%;
    z-index: 10;
    padding: 5px;
    background-color: var(--color-white);
    border-radius: var(--border-radius-medium);
    border: 1px solid var(--color-secondary-medium);
  }
  &__content-item {
    margin-bottom: 10px;

    &:last-of-type {
      margin: 0;
    }
  }
  &__btn {
    span {
      margin-right: 5px;
    }
  }
  &__btn.active {
    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>