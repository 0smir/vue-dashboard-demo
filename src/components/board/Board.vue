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
  --board-header-bg: var(--color-tetriary-light);
  --board-header-border: var(--color-secondary-light);
  --board-header-border-hovered: var(--color-primary);
  --board-header-border-radius: var(--border-radius-medium);
  --board-header-text-color: var(--color-secondary);

  --column-bg-hover: var(--color-primary-light);

  display: flex;
  justify-content: space-between;
  border-radius: var(--board-header-border-radius);
  margin: 20px 0;
  flex-direction: column;

  @media (min-width: $md) {
    flex-direction: row;
  }

  &__column {
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: var(--board-header-border-radius);

    &:hover {
      background-color: var(--color-primary-light);

      .board__column-header {
        background-color: var(--board-header-border);
      }
    }
  }
}
</style>