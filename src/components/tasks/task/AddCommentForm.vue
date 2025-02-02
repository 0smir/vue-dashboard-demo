<template>
  <div class="comment-form__wrapper">
    <form class="form form--add-comment" @submit.prevent="submitForm">
      <div :class="['form-control', 'form-control--comment']">
        <textarea id="comment" name="comment" class="form-control__textarea" placeholder="Add your comment" rows="15" v-model="comment.value"></textarea>
      </div>
      <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__outlined btn--medium comment__btn comment__btn--cancel">Cancel</BaseButton>
        <BaseButton class="btn btn__default btn--medium comment__btn comment__btn--add" type="submit">Add comment</BaseButton> 
    </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      comment: {
        text: {
          value: '',
          isValid: true
        }
      }
    }
  },
  methods: {
    submitForm() {
      console.log('submit!'); 
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
    // margin: 10px 0 15px;
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