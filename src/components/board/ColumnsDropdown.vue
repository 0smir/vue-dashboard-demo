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
        <span :class="['filter__label-text status', item == 'Active' ? 'active-status' : item.toLowerCase() ]">{{ item.name ? item.name + ' ' + item.lastName : item }}</span>
      </label>
    </li>
  </BaseDropdown>
</template>

<script>
export default {
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