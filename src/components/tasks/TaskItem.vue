<template>
  <div :class="['task', 'task__status--' + task.status.toLowerCase(), type]">
    <div class="task__info">
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
    <BaseButton v-if="isLoggedIn && (type === 'board-item')" class="btn btn__outlined btn--small task__btn-edit"
      title="edit" aria-label="edit task">
      <SvgIcon name="edit" class="icon" />
    </BaseButton>
    <div v-if="type !== 'board-item'" class="task__actions-wrapper">
      <BaseButton v-if="isLoggedIn" class="btn btn__outlined btn--small" 
                :aria-label="`Remove task id:${task.id}`"
                title="Remove task"
                @click="toggleRemoveDialog"
      >
        <SvgIcon class="icon" name="remove" />
      </BaseButton>
      <RouterLink :to="TaskLink" class="btn btn__outlined btn--small task__link" aria-label="Link to task details">Task
        details
      </RouterLink>
    </div>
  </div>
  <Teleport to="body">
    <DialogRemoveTask :show="showDeleteTaskModal" 
                      :id="task.id" 
                      @close-dialog="toggleRemoveDialog"
                      @confirm-task-removement="removeTaskItem"/>
  </Teleport>
 
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
import UserProfileImg from '@/components/auth/UserProfileInfo.vue';
import DialogRemoveTask from '@/components/tasks/DialogRemoveTask.vue';
export default {
  components: {
    TaskPriorityElement,
    UserProfileImg,
    DialogRemoveTask
  },
  props: ['task', 'type'],
  data(){
    return{
      showDeleteTaskModal: false
    }
  },
  computed: {
    TaskLink() {
      return this.$route.path + '/' + this.task.id;
    },
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    userInfo() {
      return this.task.assignee;
    }
  },
  methods: {
    getNameInitials() {
      return this.task.assignee.name.charAt(0) + this.task.assignee.lastName.charAt(0);
    },
    toggleRemoveDialog(){
      this.showDeleteTaskModal = !this.showDeleteTaskModal;
    },
    async removeTaskItem(payload){
    console.log(payload);
    let {id}=payload;
      this.toggleRemoveDialog();
      try {
        await this.$store.dispatch('tasks/removeTask', { id: id })
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  --task-border: var(--color-secondary-medium);
  --task-border-secondary: var(--color-primary);
  --task-text-color: var(--color-secondary);
  --task-text-description: var(--color-tetriary);


  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid var(--task-border);
  border-left: 4px solid;
  color: var(--task-text-color);
  background-color: #fff;

  &:last-of-type {
    margin-bottom: 0;
  }


  &__info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid var(--task-border);
  }

  &__title {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
  }

  &__description {
    margin-bottom: 7px;
    color: var(--task-text-description);
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

    &>.icon {
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
    border: 2px solid var(--task-border-secondary);
    font-size: 16px;
    background-color: var(--color-primary-light);
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

    &--todo {
      border-left-color: var(--color-todo);
    }

    &--inprogress {
      border-left-color: var(--color-inprogress);
    }

    &--inreview {
      border-left-color: var(--color-inreview);
    }

    &--testing {
      border-left-color: var(--color-testing);
    }

    &--done {
      border-left-color: var(--color-done);
    }

    &--blocked {
      border-left-color: var(--color-blocked);
    }
  }

  &__actions-wrapper {
    display: flex;
  }

  &__link {
    margin-left: auto;
    text-decoration: none;
  }
}

// .task.board-item {}

.task.grid-item {
  .task__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>