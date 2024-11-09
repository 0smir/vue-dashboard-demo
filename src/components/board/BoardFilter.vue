<template>
  <div class="filter">
    <h2 class="title filter__title"> Board filter</h2>
    <div class="filter-list__wrapper">
      <div class="filter-type">
        <p>Columns to display:</p>
        <form @submit.prevent="chooseColumns">
          <div class="form-content">
            <div class="form-control" v-for="status in taskStatuses">
              <input type="checkbox" :key="status" :id="status" :value="status" v-model="columns.val">
              <label class="filter__label" :for="status">{{ status }}</label>
            </div>
          </div>

          <BaseButton class="btn btn--save-filter">Display columns</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['taskStatuses', 'defaultBoardCollumns'],
  emits: ['save-filter'],
  data() {
    return {
      columns: {
        val: []
      }
    }
  },
  methods: {
    chooseColumns() {
      this.$emit('save-filter', this.columns.val);
    }
  },
  mounted() {
    this.columns.val = [...this.defaultBoardCollumns];
    this.chooseColumns();
  }

}
</script>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0;
}

.filter__title {
  width: 100%;
}

.form-content {
  display: flex;
}

.filter__label {
  margin: 0 15px 0 5px;
}
</style>