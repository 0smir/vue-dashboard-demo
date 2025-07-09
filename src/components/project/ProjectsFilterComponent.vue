<template>
  <div class="search-component" role="search">
    <form class="form form-search" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="search" class="form-control__label search-label">
          <input id="search"
                type="search"
                class="form-control__input" 
                placeholder="Search" 
                v-model.trim="searchValue"
                @input="updateSearch"
          >
          <BaseButton aria-label="Search" class="btn btn__dark btn--small">
            <SvgIcon class="icon" name="search"/>
          </BaseButton>
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import SvgIcon from '@/components/UI/base-components/SvgIcon.vue';

export default {
  emits:['search-updated'],
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    submitForm() {
      
    },
    updateSearch() {
      this.$emit('search-updated', this.searchValue);
    }
  }
}
</script>

<style lang="scss">
.search-label{
  display: flex;
}
</style>