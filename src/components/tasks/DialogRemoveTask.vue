<template>
  <BaseDialog @close="closeDeleteConfirmationDialog">
    <template #header>
      <h2 class="dialog__title">
        <SvgIcon class="icon icon--large" name="attention" />
        <span class="dialog__title-text">
          {{ $t("pages.tasks.modal.delete_task.title", { task_id: id }) }}
        </span>
      </h2>
    </template>
    <div class="dialog__content">
      <div class="description">
        <p class="description-text">
          {{ $t("pages.tasks.modal.delete_task.description_text_1") }}
        </p>
        <p class="description-text">{{ $t("pages.tasks.modal.delete_task.description_text_2") }}</p>
        <p class="description-text">{{ $t("pages.tasks.modal.delete_task.description_text_3") }}</p>
      </div>
      <div class="task-info__dialog-btn-wrapper">
        <BaseButton
          class="btn btn__default btn--medium btn--delete"
          :aria-label="$t('pages.tasks.btn_remove_label', { task_id: id })"
          @click="removeTask"
        >
          {{ $t("pages.tasks.modal.delete_task.btn_delete") }}
        </BaseButton>
        <BaseButton
          class="btn btn__outlined btn--medium btn--cancel"
          @click="closeDeleteConfirmationDialog"
          :aria-label="$t('pages.tasks.modal.delete_task.btn_cansel_label')"
        >
          {{ $t("pages.tasks.modal.delete_task.btn_cansel") }}
        </BaseButton>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
export default {
  props: ["id"],
  emits: ["confirm-task-removement", "close-dialog"],
  methods: {
    removeTask() {
      this.$emit("confirm-task-removement", { id: this.id });
    },
    closeDeleteConfirmationDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="scss" scoped></style>
