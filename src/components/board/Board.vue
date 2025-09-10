<template>
  <div class="board">
    <BoardColumnItem v-for="column in columnsList" :key="column" :id="column" :column="column" :tasksList="tasksList"
      :columnsCount="columnsList.length">
    </BoardColumnItem>

  </div>
</template>

<script>
import BoardColumnItem from '@/components/board/BoardColumnItem.vue';
export default {
  props: ['columnsList', 'tasksList'],

  components: {
    BoardColumnItem
  }
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  justify-content: space-between;
  border-radius: $border-radius-medium;
  margin: 20px 0;
  flex-direction: column;

  @media (min-width: $md) {
    flex-direction: row;
  }

  &__column {
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: $border-radius-medium;

    &:hover {
      background-color: $color-primary-light;

      .board__column-header {
        background-color: $color-secondary-light;
      }
    }
  }
}
</style>