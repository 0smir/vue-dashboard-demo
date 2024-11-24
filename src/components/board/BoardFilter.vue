<template>
  <div class="filter">
    <div class="filter__header">
      <BaseButton class="btn btn__default btn--small btn--board-filter" aria-label="Board filter" title="Boarder filter"
        @click="isFilterListVisible = !isFilterListVisible">
        <SvgIcon name="filterHorizontal" class="icon" />
      </BaseButton>
    </div>

    <div class="filter-list__wrapper" v-show="isFilterListVisible">
      <div class="filter-type">

        <form @submit.prevent="chooseColumns">
          <div class="form-content">
            <fieldset class="form-content__fieldset form-content__fieldset--columns">
              <legend> Columns to display:</legend>
              <div class="form-control" v-for="status in taskStatusList">
                <label :class="['filter__label', status.toLowerCase()]" :for="status">
                  <span class="filter__input-indicator">
                    <input class="filter__input" type="checkbox" :key="status" :id="status" :value="status"
                      v-model="columns.val">
                    <SvgIcon name="checkCircle" class="icon" />
                  </span>

                  <span class="filter__label-text">{{ status }}</span>
                </label>
              </div>
            </fieldset>
            <fieldset class="form-content__fieldset form-content__fieldset--person">
              <legend>Assigneed to:</legend>
            </fieldset>
            <fieldset class="form-content__fieldset form-content__fieldset--labels">
              <legend>Task priority:</legend>
              <select name="priority" id="task-priority">
                <option v-for="prirityItem in priorityList" :value="prirityItem">{{ prirityItem }}</option>
              </select>
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
      priorityList: this.$store.getters['tasks/getPriorityList'],
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
  --filter-btn-bg: var(--color-primary-light);
  --filter-btn-text-color: var(--color-primary);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 0 15px 0;

  &__header {
    margin-bottom: 20px;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    padding: 3px 7px;
    margin: 0 15px 0 5px;
    height: 30px;
    border-radius: 16px;

    .icon {
      display: none;
    }
  }

  &__input {
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: 0;
    cursor: pointer;

    &-indicator {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 19px;
      height: 19px;
      margin-right: 5px;
      background: var(--color-text);
      border-radius: 16px;
    }
  }

  &__input-indicator {
    &:has(:checked) {
      background-color: transparent;

      .icon {
        display: inline-block;
        transform: scale(1.2);
      }
    }

    &:has(:focus) {
      outline: 2px solid var(--color-secondary);
    }
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

.btn--board-filter {
  &:hover {
    color: var(--filter-btn-text-color);
    background-color: var(--filter-btn-bg);
  }
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__fieldset {
    display: flex;
  }

  &__fieldset--columns {
    width: 100%;
  }

  &__fieldset--person,
  &__fieldset--labels {
    width: calc(50% - 8px);
  }
}
</style>