<template>
  <BaseDropdown :placeholder="placeholder">
    <li class="dropdown__content-item" v-for="item in options">
      <label  class="filter__label" :for="item.id || item">
        <span class="filter__input-indicator">
          <input class="filter__input" type="checkbox" 
                                      :key="item.id || item" 
                                      :id="item.id || item" 
                                      :value="item"
                                      v-model="selectedValues">
          <SvgIcon name="check" class="icon icon--small" />
        </span>
        <TaskPriorityElement :priority="item" :titleDisplay="true" />
      </label>
    </li>
  </BaseDropdown>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';

export default {
  components: { TaskPriorityElement },
  props: {
    modelValue: Array,
    options: Array,
    placeholder: String
  },
  emits: ["update:modelValue"],
  computed: {
    selectedValues: {
      get() {
        return this.modelValue || [];
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>