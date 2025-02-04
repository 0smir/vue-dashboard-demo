<template>
  <div class="comment-form__wrapper">
    <form class="form form--add-comment" @submit.prevent="submitForm">
      <div :class="['form-control', 'form-control--comment', {error: !comment.isValid}]">
        <textarea id="comment" name="comment" class="form-control__textarea" placeholder="Add your comment" rows="15" v-model="comment.value"></textarea>
        <p class="error-text" v-if="!comment.isValid">{{ comment.errorMessage }}</p>
      </div>
      <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__outlined btn--medium comment__btn comment__btn--cancel"  type="button" @click="clearForm">Cancel</BaseButton>
        <BaseButton class="btn btn__default btn--medium comment__btn comment__btn--add" type="submit">Add comment</BaseButton> 
    </div>
    </form>
  </div>
</template>

<script>
export default {
  props:["taskID"],
  data() {
    return {
      isFormValid: true,
      error: null,
      comment: {
        value: '',
        errorMessage: 'Comment can\'t be empty!',
        isValid: true
      }
    }
  },
  methods: {
    submitForm() {
      console.log('submit!'); 
      this.validateForm();
      if (!this.isFormValid) return;
      this.addComment();
    },

    validateForm() {
      this.isFormValid = true;
      if (!this.comment.value) {
        this.comment.isValid = false;
        this.isFormValid = false;
        return;
      }
    },

    async addComment() {
      let payload = {
          id: this.taskID,
          mode: 'comment',
          authorID: this.$store.userID,
          commentText: this.comment.value
        };  
      try {
        await this.$store.dispatch('tasks/AddComment', payload);
      }
      catch (error) {
        this.error = error.message || 'Smth goes wrong!';
      }

      this.clearForm();
    },
    clearForm() {
      this.comment.value = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-form__wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.form--add-comment {
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .comment {
    &__btn {
      min-width: auto;
      min-height: auto;
      padding: 8px;
    }
    &__btn--cancel {
      margin-right: 15px;
    }
  }
}

</style>