<template>
  <div :class="['task flex', 'task__status--' + task.status.toLowerCase(), type]">
    <div class="task__info flex">
      <span class="task__info-id">
        <TaskPriorityElement :priority="task.priority" />
        <span class="task-id">{{ task.id }}</span>
      </span>
      <UserProfileImg :userInfo="userInfo" theme="light" />
    </div>

    <h2 :class="['task__title', { cropped: type !== 'board-item' }]">{{ task.title }}</h2>
    <div class="task__description">
      {{ task.description }}
    </div>
    <BaseButton
      v-if="isLoggedIn && type === 'board-item'"
      class="btn btn__outlined btn--small task__btn-edit"
      :title="$t('pages.tasks.edit_task')"
      :aria-label="$t('pages.tasks.btn_edit_label')"
    >
      <SvgIcon name="edit" class="icon" />
    </BaseButton>
    <div v-if="type !== 'board-item'" class="task__actions-wrapper">
      <div class="task__status-info">
        <span :class="['task__status-indicator', 'task__status--' + task.status.toLowerCase()]"></span> 
        {{ task.status }}
      </div>
      <BaseButton
        v-if="isLoggedIn"
        class="btn btn__outlined btn--small"
        :aria-label="$t('pages.tasks.btn_remove_label', { task_id: task.id })"
        :title="$t('pages.tasks.remove_task')"
        @click="toggleRemoveDialog"
      >
        <SvgIcon class="icon" name="remove" />
      </BaseButton>
      <RouterLink
        :to="TaskLink"
        class="btn btn__default btn--small task__link"
        :aria-label="$t('pages.tasks.link_see_details_label')"
      >
        {{ $t("pages.tasks.link_see_details") }}
      </RouterLink>
    </div>
  </div>
  <Teleport to="body">
    <DialogRemoveTask
      :show="showDeleteTaskModal"
      :id="task.id"
      @close-dialog="toggleRemoveDialog"
      @confirm-task-removement="removeTaskItem"
    />
  </Teleport>
</template>

<script>
import TaskPriorityElement from "@/components/tasks/TaskPriorityElement.vue";
import UserProfileImg from "@/components/auth/UserProfileInfo.vue";
import DialogRemoveTask from "@/components/tasks/DialogRemoveTask.vue";
export default {
  components: {
    TaskPriorityElement,
    UserProfileImg,
    DialogRemoveTask,
  },
  props: ["task", "type"],
  data() {
    return {
      showDeleteTaskModal: false,
    };
  },
  computed: {
    TaskLink() {
      return this.$route.path + "/" + this.task.id;
    },
    isLoggedIn() {
      return this.$store.getters["users/isAuthenticated"];
    },
    userInfo() {
      return this.task.assignee;
    },
  },
  methods: {
    getNameInitials() {
      return this.task.assignee.name.charAt(0) + this.task.assignee.lastName.charAt(0);
    },
    toggleRemoveDialog() {
      this.showDeleteTaskModal = !this.showDeleteTaskModal;
    },
    async removeTaskItem(payload) {
      console.log(payload);
      let { id } = payload;
      this.toggleRemoveDialog();
      try {
        await this.$store.dispatch("tasks/removeTask", { id: id });
      } catch (error) {
        this.error = error.message || "Smth went wrong!";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 12px;
  height: 100%;
  border-radius: 6px;
  border: 2px solid $color-secondary-medium;
  border-top: 4px solid;
  color: $color-secondary;
  background-color: $color-white;
  box-shadow: $task-panel-shadow;

  &:last-of-type {
    margin-bottom: 0;
  }

  &__info {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid $color-secondary-medium;
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
  }

  &__description {
    margin-bottom: 7px;
    color: $color-tetriary;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__btn-edit {
    max-width: 35px;
    margin-left: auto;

    & > .icon {
      width: 20px;
      height: 20px;
    }
  }

  :deep(.priority__wrapper) {
    margin-right: 4px;
  }

  &__info-assignee {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border: 2px solid $color-primary;
    font-size: 16px;
    background-color: $color-primary-light;
    font-weight: 400;
    padding: 2px;
    margin-left: auto;
  }

  &__info-id {
    display: flex;
    align-items: center;

    .task-id {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  &__status {
    &--active {
      border-top-color: $color-active;
    }

    &--todo {
      border-top-color: $color-todo;
    }

    &--inprogress {
      border-top-color: $color-inprogress;
    }

    &--inreview {
      border-top-color: $color-inreview;
    }

    &--testing {
      border-top-color: $color-testing;
    }

    &--done {
      border-top-color: $color-done;
    }

    &--blocked {
      border-top-color: $color-blocked;
    }
  }

  &__actions-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  &__status-info {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    margin-right: auto;
    min-width: 40px;
    font-size: 12px;
    font-weight: 500;
    color: #1B2430;
    background: #F2F4F7;
    border: 1px solid $color-secondary-medium;
    border-radius: $border-radius-rounded;
  }
  
  &__status-indicator {
    height: 10px;
    width: 10px;
    margin-right: 5px;
    border-radius: $round;

    &.task__status {
      &--active {
        background-color: $color-active;
      }

      &--todo {
        background-color: $color-todo;
      }

      &--inprogress {
        background-color: $color-inprogress;
      }

      &--inreview {
        background-color: $color-inreview;
      }

      &--testing {
        background-color: $color-testing;
      }

      &--done {
        background-color: $color-done;
      }

      &--blocked {
        background-color: $color-blocked;
      }
    }
  }

  &__link {
    margin-left: 10px;
    text-decoration: none;
  }
}

.task.board-item {
  .task__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.task.board-item {
  .task__title {
    font-size: 15px;
  }
}

</style>
