<template>
  <div class="container">
    <h2 class="title page-title">Create new board</h2>
   <NewBoardForm />
  </div>
</template>

<script>
import NewBoardForm from '@/components/board/NewBoardForm.vue';
export default {
  components: {
    NewBoardForm
  }

}
</script>

<style lang="scss" scoped></style>