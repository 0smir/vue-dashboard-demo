<template>
  <div class="filter">
    <div class="filter__header">
      <BaseButton class="btn btn--small btn--board-filter" aria-label="Board filter" title="Boarder filter"
        @click="isFilterListVisible = !isFilterListVisible">
        <SvgIcon name="filterHorizontal" class="icon" />
      </BaseButton>
    </div>

    <div class="filter-list__wrapper" v-show="isFilterListVisible">
      <div class="filter-type">

        <form @submit.prevent="chooseColumns">
          <div class="form-content">
            <fieldset>
              <legend>
                <p>Columns to display:</p>
              </legend>
              <div class="form-control" v-for="status in taskStatusList">
                <input type="checkbox" :key="status" :id="status" :value="status" v-model="columns.val">
                <label class="filter__label" :for="status">{{ status }}</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <p>Name:</p>
              </legend>
            </fieldset>
            <fieldset>
              <legend>
                <p>Labels:</p>
              </legend>
            </fieldset>
          </div>
          <div class="filter__btn-wrapper">
            <BaseButton class="btn btn--medium filter__btn--apply">Apply Filter</BaseButton>
            <BaseButton class="btn btn--medium btn--light filter__btn--clear" @click="clearFilter">Clear</BaseButton>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  emits: ['save-filter'],
  data() {
    return {
      taskStatusList: this.$store.getters['tasks/getStatusList'],
      defaultBoardCollumns: this.$store.getters['boards/getDefaultBoardColumns'],
      isFilterListVisible: false,
      columns: {
        val: []
      }
    }
  },
  methods: {
    chooseColumns() {
      this.$emit('save-filter', this.columns.val);
    },
    clearFilter() {
      this.columns.val = [...this.defaultBoardCollumns];
      this.chooseColumns();
    }
  },
  mounted() {
    this.columns.val = [...this.defaultBoardCollumns];
    this.chooseColumns();
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 0 15px 0;

  &__header {
    margin-bottom: 20px;
  }

  &__label {
    margin: 0 15px 0 5px;
  }

  &__btn-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    @media (min-width: 769px) {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__btn {
    &--apply {
      width: 100%;
      margin-bottom: 10px;

      @media (min-width: 769px) {
        width: auto;
        order: 2;
        margin-bottom: 0;
      }
    }

    &--clear {
      width: 100%;

      @media (min-width: 769px) {
        margin: 0 10px 0 0;
        width: auto;
      }
    }
  }
}


.form-content {
  display: flex;
}
</style>