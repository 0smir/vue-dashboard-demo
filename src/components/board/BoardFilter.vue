<template>
  <div class="filter">
    <div class="filter__header">
      <BaseButton class="btn btn__default btn--small btn--board-filter" aria-label="Board filter" title="Boarder filter"
        @click="isFilterListVisible = !isFilterListVisible">
        <SvgIcon name="filterHorizontal" class="icon" />
      </BaseButton>
      <div class="filter-params__wrapper">
        <BoardFilterParamsItem v-if="selectedColumns.length" 
                              :options="selectedColumns"
                              mode="columns"
                              @remove-filter-item="removeFilterParamItem"
        />
        <BoardFilterParamsItem v-if="selectedPeople.length" 
                              :options="selectedPeople"
                              mode="persons"
                               @remove-filter-item="removeFilterParamItem"
        />
        <BoardFilterParamsItem v-if="selectedPriorities.length" 
                              :options="selectedPriorities"
                              mode="priority"
                               @remove-filter-item="removeFilterParamItem"
        />
      </div>
    </div>
    <template v-if="!isLoading">
      <div class="filter-list__wrapper" v-show="isFilterListVisible">
        <form @submit.prevent="chooseColumns">
          <div class="form-content">
            <BoardFilterDropdown v-model="selectedColumns" 
                          :options="taskStatusList" 
                          placeholder="Select columns"
                          mode="columns"
            />

            <BoardFilterDropdown v-model="selectedPeople"
                                :options="peopleList"
                                placeholder="Select People"
                                mode="person"
            />
      
            <BoardFilterDropdown v-model="selectedPriorities"
                                :options="priorityList"
                                placeholder="Select Priority"
                                mode="priority"
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
import BaseButton from '../UI/base-components/BaseButton.vue';
import BoardFilterDropdown from '@/components/board/BoardFilterDropdown.vue';
import BoardFilterParamsItem from '@/components/board/BoardFilterParamsItem.vue';
import BaseSpinner from '../UI/base-components/BaseSpinner.vue';

export default {
  components: {
    BoardFilterDropdown,
    BoardFilterParamsItem
  },
  emits: ['save-filter'],
  data() {
    return {
      priorityList: this.$store.getters['tasks/getPriorityList'],
      taskStatusList: this.$store.getters['tasks/getStatusList'],
      defaultBoardCollumns: this.$store.getters['boards/getDefaultBoardColumns'],
      isFilterListVisible: true,
      selectedColumns: [],
      selectedPeople: [],
      selectedPriorities: [],
      isLoading: false
    }
  },
  computed: {
    peopleList() {
      return this.$store.getters['people/getEmployeesList'];
    }
  },
  methods: {
    chooseColumns() {
      this.$emit('save-filter', this.selectedColumns);
    },
    removeFilterParamItem(params) {
      let { option, mode } = params;
      let selectedArray,
        itemIndex,
        targetItem = option.id || option;
      switch (mode){
        case 'columns': selectedArray = this.selectedColumns;
          break;
        case 'persons': selectedArray = this.selectedPeople;
          break;
        case 'priority': selectedArray = this.selectedPriorities;
          break;
      }
      itemIndex = selectedArray.indexOf(targetItem);
      selectedArray.splice(itemIndex, 1);
    },
    clearFilter() {
      
      this.selectedPeople = [];
      this.selectedPriorities = [];
      this.selectedColumns = [...this.defaultBoardCollumns];
      this.chooseColumns();
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
  },
  mounted() {
    this.selectedColumns = [...this.defaultBoardCollumns];
    this.chooseColumns();
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
  padding: 0 0 15px 0;

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
  // &__column-item {
  //   display: inline-flex;
  //   align-items: center;
  //   margin-right: 10px;
  //   padding: 3px 7px;
  //   color: var(--color-text);
  //   border-radius: var(--border-radius-large);
    
  //   &:hover {
  //     .filter-params__btn-remove {
  //       background-color: rgba(#fff, .3);
  //     }
  //   }
  // }
  // &__btn-remove {
  //   display: flex;
  //   justify-content: center;
  //   margin-left: 6px;
  //   padding: 0;
  //   border-radius: 50%;
  //   border: 1px solid var(--color-white);
  //   background: transparent;
  // }
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