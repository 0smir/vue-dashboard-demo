<template>
<BaseDialog @close="closeDeleteConfirmationDialog">
    <template #header>
      <h2 class="dialog__title">
        <SvgIcon class="icon icon--large" name="attention"/>
        <span class="dialog__title-text">Delate task {{id}} ?</span>
      </h2>
    </template>
    <div class="dialog__content">
      <div class="description">
        <p class="description-text">Are you about permanently delete this task. It's comments and all of it's data.</p>
        <p class="description-text">If you are not sure, you can close this task.</p>
      </div>
      <div class="task-info__dialog-btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--delete" 
                    :aria-label="`Remove task id:${id}`"
                    @click="removeTask"
        >
          Delete
        </BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel" 
                    @click="closeDeleteConfirmationDialog"
                    aria-label="Cansel. Close dialog"
        >
          Cancel
        </BaseButton>
    </div>
    </div>
  </BaseDialog>
</template>

<script>
export default {
  props: ['id'],
  emits: ['confirm-task-removement', 'close-dialog'],
  methods:{
    removeTask(){
      this.$emit('confirm-task-removement', {id: this.id});
    },
    closeDeleteConfirmationDialog(){
      this.$emit('close-dialog');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>