<template>
  <div class="container">
    <h1>Boards list</h1>
    <ul>
      <li class="board-link__wrapper" v-for="board in boardsList">
        <router-link  :to="getUrl(board.id)" 
                      :key="board.id"
                      class="board-link"
        >
          {{ board.title }}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  computed: {
    boardsList(){
      return this.$store.getters["boards/getBoardsList"];
    }
  },
  methods: {
    async LoadAllBoardsData(){
      this.$store.dispatch("boards/LoadAllBoardsData");
    },
    getUrl(id){
      return `/boards/${id}`;
    }
  },

  created(){
    this.LoadAllBoardsData();
  }
}
</script>

<style lang="scss" scoped>
.board-link {
  color: $color-primary;
  // &__wrapper {
    
  // }
}

</style>