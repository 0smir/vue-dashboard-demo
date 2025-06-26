<template>
  <div class="filter">
    <div class="filter__header">
      <BaseButton class="btn btn__default btn--small btn--board-filter" aria-label="Board filter" title="Boarder filter"
        @click="isFilterListVisible = !isFilterListVisible">
        <SvgIcon name="filterHorizontal" class="icon" />
      </BaseButton>
      <div class="filter-params__wrapper">
        <BoardFilterParamsItem v-if="filterParams.selectedColumns.length" 
                              :options="filterParams.selectedColumns"
                              mode="columns"
                              @remove-filter-item="removeFilterParamItem"
        />
        <BoardFilterParamsItem v-if="filterParams.selectedPeople.length" 
                              :options="filterParams.selectedPeople"
                              mode="persons"
                               @remove-filter-item="removeFilterParamItem"
        />
        <BoardFilterParamsItem v-if="filterParams.selectedPriorities.length" 
                              :options="filterParams.selectedPriorities"
                              mode="priority"
                              @remove-filter-item="removeFilterParamItem"
        />
      </div>
    </div>
    <template v-if="!isLoading">
      <div class="filter-list__wrapper" v-show="isFilterListVisible">
        <form @submit.prevent="submitForm">
          <div class="form-content">
            <ColumnsDropdown v-model="filterParams.selectedColumns" 
                             :options="statusOptions" 
                             placeholder="Select columns" 
            />
            <PeopleDropdown v-model="filterParams.selectedPeople"
                            :options="peopleOptions"
                            placeholder="Select People"
            />
            <PrioritiesDropdown v-model="filterParams.selectedPriorities"
                                :options="priorityOptions"
                                placeholder="Select Priority"
            />
          </div>
          <div class="filter__btn-wrapper">
            <BaseButton class="btn btn__default btn--medium filter__btn--apply">Apply Filter</BaseButton>
            <BaseButton class="btn btn__outlined btn--medium btn--light filter__btn--clear" @click="clearFilter">Clear
            </BaseButton>
          </div>
        </form>
      </div>
    </template>
    <BaseSpinner v-else/>
  </div>
</template>

<script>

import BoardFilterParamsItem from '@/components/board/BoardFilterParamsItem.vue';
import ColumnsDropdown from '@/components/board/ColumnsDropdown.vue';
import PrioritiesDropdown from '@/components/board/PrioritiesDropdown.vue';
import PeopleDropdown from '@/components/board/PeopleDropdown.vue';


export default {
  components: {
    BoardFilterParamsItem,
    ColumnsDropdown,
    PrioritiesDropdown,
    PeopleDropdown
  },
  props: ['boardId', 'filterData'],
  emits: ['save-filter'],
  data() {
    return {
      isFilterListVisible: false,
      isLoading: false,
      defaultBoardCollumns: this.$store.getters['boards/getDefaultBoardColumns'],
      priorityOptions: this.$store.getters['tasks/getPriorityList'],
      statusOptions: this.$store.getters['tasks/getStatusList'],
      filterParams: {
        selectedColumns: this.filterData.columns,
        selectedPeople: this.filterData.people,
        selectedPriorities: this.filterData.priority,
      }
    }
  },
  computed: {
    peopleOptions() {
      return this.$store.getters['people/getEmployeesList'];
    }
  },
  methods: {
    submitForm(e) {
      this.updateFilter();
    },

    updateFilter() {
      this.$emit('save-filter', this.filterParams);
    },

    removeFilterParamItem(params) {
      let { option, mode } = params;
      let selectedArray,
        itemIndex,
        targetItem = option.id || option;
      switch (mode){
        case 'columns': selectedArray = this.filterParams.selectedColumns;
          break;
        case 'persons': selectedArray = this.filterParams.selectedPeople;
          break;
        case 'priority': selectedArray = this.filterParams.selectedPriorities;
          break;
      }
      itemIndex = selectedArray.indexOf(targetItem);
      selectedArray.splice(itemIndex, 1);
      this.updateFilter();
    },

    clearFilter() {
      this.filterParams.selectedPeople = [];
      this.filterParams.selectedPriorities = [];
      this.filterParams.selectedColumns = [...this.defaultBoardCollumns];
      this.updateFilter();
    },

    async loadUsersList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('people/loadEmployeesList');
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  },
  created() {
    this.loadUsersList();
    let boardsFilterData = JSON.parse(localStorage.getItem('boardsFilterParams'));

    if (boardsFilterData && boardsFilterData[this.boardId] && boardsFilterData[this.boardId]){
      let params = JSON.parse(localStorage.getItem('boardsFilterParams'))[this.boardId];

      this.filterParams.selectedColumns = params.columns;
      this.filterParams.selectedPeople = params.people;
      this.filterParams.selectedPriorities = params.priority;

    } else if (!this.filterData.columns.length && !this.filterData.people.length && !this.filterData.priority.length) {
      this.filterParams.selectedColumns = [...this.defaultBoardCollumns];
    }

    this.updateFilter();
  }
}
</script>

<style lang="scss" >
.filter {
  --filter-btn-bg: var(--color-primary-light);
  --filter-btn-text-color: var(--color-primary);
  --fieldset-legend-text-color: var(--color-secondary);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 135px 15px 0;
  border-bottom: 2px solid var(--color-primary);

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__label {
    display: inline-flex;
    align-items: center;

    .icon {
      display: none;
    }
  }

  &__label-text.status {
    padding: 2px 5px;
    color: var(--color-text);
    border-radius: var(--border-radius-small);
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
    background-color: var(--color-white);
    border: 1px solid var(--color-secondary-medium);
    border-radius: var(--border-radius-small);
    &:has(:checked) {
      border: 1px solid var(--color-tetriary);
      .icon {
        color: var(--color-tetriary);
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

    @media (min-width: $md) {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__btn {
    &--apply {
      width: 100%;
      margin-bottom: 10px;

      @media (min-width: $md) {
        width: auto;
        order: 2;
        margin-bottom: 0;
      }
    }

    &--clear {
      width: 100%;

      @media (min-width: $md) {
        margin: 0 10px 0 0;
        width: auto;
      }
    }
  }
}
.filter-params {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
.btn--board-filter {
  align-self: flex-start;
  margin-right: 15px;
  transition: background-color .25s linear;
  &:hover {
    color: var(--filter-btn-text-color);
    background-color: var(--filter-btn-bg);
    transition: background-color .25s linear;
  }
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: $md){
    justify-content: flex-start;
  }
}
</style>