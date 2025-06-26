<template>
 <form @submit.prevent="submitForm" :class="['form', 'form-add-board']">
    <div class="form__content">
      <div :class="['form-control', 'form-control--title', { error: !board.title.isValid }]">
        <label class="form-control__label" for="title">Title</label>
        <input class="form-control__input" id="title" type="text" v-model.trim="board.title.value">
        <p class="error-text" v-if="!board.title.isValid">{{ board.title.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--description', { error: !board.description.isValid }]">
        <label class="form-control__label" for="description">board description: </label>
        <textarea class="form-control__textarea" name="board-description" id="description" rows="5"
          v-model="board.description.value"></textarea>
        <p class="error-text" v-if="!board.description.isValid">{{ board.description.errorMessage }}</p>
      </div>
      <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--add" type="submit">Create board</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel">Cancel</BaseButton>
      </div>
    </div>
  </form>
  <p v-if="!error" class="error">
    {{ error }}
  </p>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      error: null,
      board: {
        title: {
          value: '',
          errorMessage: 'Board title is required and cannot be empty.',
          isValid: true
        },
        description: {
          value: '',
          errorMessage: 'Board description is required and cannot be empty.',
          isValid: true
        },
        tasksList: []
      }
    }
  },
  methods: {
    submitForm() {
      console.log('submit form');
      this.validateForm();
      if (!this.isFormValid) return;
      this.createBoard();
    },
    validateForm() {
      this.isFormValid = true;
      if (this.board.title.value === '') {
        this.board.title.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.board.description.value === '') {
        this.board.description.isValid = false;
        this.isFormValid = false;
        return;
      }
    },
    async createBoard() {
      let boardTitle = (this.board.title.value).toLowerCase();
      let boardID = (boardTitle.split(' ')).join('_');

      let newBoardData = {
        id: boardID,
        title: this.board.title.value,
        description: this.board.description.value,
        tasksList: this.board.tasksList
      };
      try {
        await this.$store.dispatch('boards/addBoard', newBoardData); 
       //TODO: show success board creatin popover
      } catch (error) {
        this.error = error.message || 'Something goes wrong!';
      }
      
      this.clearFormFields();
      this.redirectToBoard(boardID);
    },
    redirectToBoard(id) {
      let redirectUrl = '/board/' + id;
      this.$router.replace(redirectUrl);
    },
    clearFormFields() {
      this.board.title.value = '';
      this.board.description.value = '';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>