<template>
  <BaseSpinner v-if="isLoading"></BaseSpinner>
  <div v-else class="container">
    <h1>{{ boardData.title }}</h1>
    board {{ id }} page
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    boardData() {
      return this.$store.getters['boards/getBoardData'];
    }
  },
  methods: {
    async loadBoardInfo(id) {
      this.isLoading = true;
      console.log(id);
      
      try {
        await this.$store.dispatch('boards/loadBoardData', { id });
      } catch (error) {
        this.error = error.message || 'faled to Fatch';
      }
      this.isLoading = false;
    }

  },

  created() {
    let boardID = this.id;
    this.loadBoardInfo(boardID);
  }
}
</script>

<style lang="scss" scoped>

</style>