<template>
  <div v-if="isLoading" class="container container__spinner-wrapper" aria-busy="true" aria-live="polite">
    <BaseSpinner></BaseSpinner>
  </div>
  <div v-else-if="isLoading === false && hasTaskInfo" class="task-info task-info__container">
    <div class="task-info__details">
      <div class="task-info__actions-wrapper">
        <TaskStatusDetails :taskStatusList="taskStatusList" :taskStatus="taskStatus" @choose-action="updateTaskParams"/>
        <TaskActionsDetails :taskActionsList="taskActionsList" mode="actions" @choose-action="actionExecute"/>
      </div>
      <details class="details" open>
        <summary class="summary">
          <span class="details__title">Task Details</span>
          <SvgIcon class="icon icon--small details__arrow" name="chevron-down" />
        </summary>
        <div class="task-info__details-wrapper">
        <TaskAssigneeDetails v-if="assigneeInfo" :assignee="assigneeInfo"
                              @update-assignee="updateTaskParams"
        />
        <TaskPriorityDetails v-if="taskPriorityList" :taskPriorityList="taskPriorityList"
                             :priorityTitle="taskInfo.priority"
                             @choose-action="updateTaskParams"
        />
        <TaskProjectDetails v-if="taskInfo?.project" 
                            :title="taskInfo?.project?.title"
                            @choose-action="updateTaskParams"
        />
        <TaskReporterDetails v-if="taskInfo.reporter" :reporter="taskInfo.reporter" 
                              @update-reporter="updateTaskParams"
        />
        <div v-if="taskInfo?.estimateTime" class="task-details task-details__time task-details--time-estimated">
          <span class="task-details__label task-details__label--time-estimated">Estimated: </span>
          <span class="task-details__value task-details__value--time-estimated"> {{ taskInfo?.estimateTime + 'h' }}</span>
        </div>
        <TaskTreckedTimeDetails v-if="taskInfo?.loggedTime" :isLabelVisible="true" :estimated="taskInfo?.estimateTime" :trecked="taskInfo?.loggedTime"/>

        <div v-if="taskInfo?.createdTime" class="task-details task-details__time task-details__time--created">
          <span class="task-details__label task-details__label--time-created">Created: </span>
          <span class="task-details__value task-details__value--time-created"> {{ createTime }}</span>
        </div>
        <div v-if="taskInfo?.updateTime" class="task-details task-details__time task-details__time--updated">
          <span class="task-details__label task-details__label--time-updated">Updated: </span>
          <span class="task-details__value task-details__value--time-updated"> {{ updateTime }}</span>
        </div>
      </div>
    </details>
    </div>
    <div class="task-info__task-data">
      <TaskContent :taskInfo="taskInfo" />
      <div v-if="taskUpdatesHistory">
       <TaskActivityComponent :taskID="id" :activity="taskUpdatesHistory"/>
      </div>
    </div>
  </div>
  <div v-else-if="!isLoading && !hasTaskInfo && !error" class="task-info task-info__container task-info__notfound">
    <div class="container container__notfound">
      <h3 class="title title--notfound">Uh-oh! It seems there's no task matching this ID: {{ id }}. Please double-check and try again.</h3>
      <ul class="link__wrapper">
        <li><router-link class="link task-info__notfound-link" to="/">Back Home</router-link></li>
        <li><router-link class="link task-info__notfound-link" to="/tasks">See All tasks list</router-link></li>
      </ul>
    </div>
  </div>
  <BaseDialog :show="showLogTimeModal" title="Time tracking" @close="closeLogTimeDialog">
    <TaskTreckedTimeDetails :isLabelVisible="false"
                            :estimated="taskInfo?.estimateTime" 
                            :trecked="taskInfo?.loggedTime"/>
    <LogTimeForm className="trek-time" :id="id" :trecked="taskInfo?.loggedTime" />
  </BaseDialog>
  <BaseDialog :show="showDeleteConfirmationModal" @close="closeDeleteConfirmationDialog">
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
        <BaseButton class="btn btn__default btn--medium btn--delete" @click="removeTask">Delete</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel" @click="closeDeleteConfirmationDialog">Cancel</BaseButton>
    </div>
    </div>
  </BaseDialog>
  <BaseDialog :show="showLoginRequirementModal" @close="closeLoginRequirementDialog">
    <template #header>
      <h2 class="dialog__title">
        <SvgIcon class="icon icon--large" name="attention"/>
        <span class="dialog__title-text">You're Not Logged In!</span>
      </h2>
    </template>
    <div class="dialog__content">
      <div class="description">
        <p class="description__text">
          You need to be logged in to make changes to this task.
          Please sign in to log time, update the priority, change the status, or modify this task.
        </p>
      </div>
      <div class="task-info__dialog-btn-wrapper">
        <router-link class="link btn btn__default btn--medium btn--login" to="/login">Login</router-link>
        <router-link class="link btn btn__default btn--medium btn--signup" to="/people/registration">SignUp</router-link>
      </div>
    </div>
  </BaseDialog>
  <p v-if="!isLoading && error">Error</p>
</template>

<script>
import TaskStatusDetails from '@/components/tasks/TaskStatusDetails.vue';
import TaskActionsDetails from '@/components/tasks/TaskActionsDetails.vue';
import TaskAssigneeDetails from '@/components/tasks/TaskAssigneeDetails.vue';
import TaskPriorityDetails from '@/components/tasks/TaskPriorityDetails.vue';
import TaskReporterDetails from '@/components/tasks/TaskReporterDetails.vue';
import TaskProjectDetails from '@/components/tasks/TaskProjectDetails.vue';
import TaskTreckedTimeDetails from '@/components/tasks/TaskTreckedTimeDetails.vue';
import LogTimeForm from '@/components/tasks/LogTimeForm.vue';

import TaskContent from '@/components/tasks/TaskContent.vue';
import TaskActivityComponent from '@/components/tasks/task/TaskActivityComponent.vue';
import SvgIcon from '@/components/UI/base-components/SvgIcon.vue';
export default {
  components: {
    TaskStatusDetails,
    TaskActionsDetails,
    TaskAssigneeDetails,
    TaskPriorityDetails,
    TaskReporterDetails,
    TaskProjectDetails,
    TaskTreckedTimeDetails,
    LogTimeForm,
    TaskContent,
    TaskActivityComponent
  },
  props: ['id'],
  data() {
    return {
      isLoading: false,
      error: null,
      showLogTimeModal: false,
      showDeleteConfirmationModal: false,
      showLoginRequirementModal: false
    }
  }, 
  computed: {
    isLoggedIn() {
      return this.$store.getters['users/isAuthenticated'];
    },
    taskInfo() {
      return this.$store.getters['tasks/getTaskInfo'];
    },
    hasTaskInfo() {
      return !this.isLoading && (this.taskInfo !== null);
    },
  
    taskPriorityList() {
      return this.$store.getters['tasks/getPriorityList'];
    },
    taskStatusList() {
      return this.$store.getters['tasks/getStatusList'];
    },
    taskActionsList() {
      return this.$store.getters['tasks/getTaskActionsList'];
    },
    taskStatus() {
      return this?.taskInfo?.status;
    },
    taskUpdatesHistory() {
      return this?.taskInfo?.taskUpdatesHistory;
    },
    assigneeInfo() {
      return this.taskInfo?.assignee;
    },
    createTime() {
      return this.formatDate(this?.taskInfo?.createdTime);
    },
    updateTime() {
      return this.formatDate(this?.taskInfo?.updateTime);
    }
  },
  methods: {
    async getTaskData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('tasks/getTaskData', { id: this.id });
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(timestamp) {
      if (!timestamp) return '';

      let creatinDate = new Date(timestamp);
      let year    = creatinDate.getFullYear();
      let month   = String(creatinDate.getMonth() + 1).padStart(2, '0');
      let day     = String(creatinDate.getDate()).padStart(2, '0');
      let hour    = String(creatinDate.getHours()).padStart(2, '0');
      let minute  = String(creatinDate.getMinutes()).padStart(2, '0');
      let seconds = String(creatinDate.getSeconds()).padStart(2, '0');  

      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    },

    updateTaskParams(newParams) {
      console.log(newParams);
      //mode: 'status', 'priority', 'project', 'assignee', 'reporter'
      let { newVal, mode } = newParams;
      let params = {};
      params[mode] = newVal;

      if (!this.isLoggedIn) {
        this.showLoginRequirementDialog();
        return;
      } else {
        this.$store.dispatch('tasks/updateTask', { id: this.taskInfo.id, mode: mode, ...params });
      }
    },
    async actionExecute(newParams) {
      let { newVal } = newParams;
      if (!this.isLoggedIn) {
        this.showLoginRequirementDialog();
        return;
      }
      if (newVal === 'logtime') {
        this.showLogTimeDialog();
      }
      if (newVal === 'print') {
        window.print();
      }
      if (newVal === 'delete') {
        this.showDeleteConfirmationModal = true;
      }
    },
    async removeTask() {
      this.isLoading = true;
      this.closeDeleteConfirmationDialog();
      try {
        await this.$store.dispatch('tasks/removeTask', { id: this.id });
        this.$router.push('/tasks');
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      } finally {
        this.isLoading = false;
      }
    },
    showLogTimeDialog() {
      this.showLogTimeModal = true;
    },
    closeLogTimeDialog() {
      this.showLogTimeModal = false;
    },
    showDeleteConfirmationDialog() {
      this.showDeleteConfirmationModal = true;
    },
    closeDeleteConfirmationDialog() {
      this.showDeleteConfirmationModal = false;
    },

    showLoginRequirementDialog() {
      this.showLoginRequirementModal = true;
    },
    closeLoginRequirementDialog() {
      this.showLoginRequirementModal = false;
    }
  },
  created() {
    this.getTaskData();
  }
}
</script>

<style lang="scss">
.task-info {
  &__container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: calc(100% - 30px);
    margin: 30px auto 0;

    @media (min-width: $md) {
      flex-direction: row;
    }
  }

  &__details {
    width: 100%;
    margin-bottom: 15px;

    @media (min-width: $md) {
      order: 2;
      max-width: calc(35% - 10px);
    }
  }

  &__task-data {
    width: 100%;
    padding-top: 25px;
    @media (min-width: $md) {
      padding-top: 0;
      order: 1;
      max-width: calc(65% - 10px);
    }
  }

  &__label {
    font-size: 1.6rem;
    font-weight: 500;

    @media (min-width: $md) {
      font-size: 1.5rem;
      margin: 0 0 20px;
    }
  }

  &__value {
    display: flex;
    flex-direction: column;
  }

  &__actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;

    @media print {
      display: none;
    }
  }

  &__details-wrapper {
    padding: 10px 5px 10px 15px;
    border-top: 1px solid var(--color-secondary-medium);
  }

  &__dialog-btn-wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: $sm) {
      flex-direction: row;
      justify-content: flex-end;  
    }

    .btn--delete {
      margin-bottom: 15px;

      @media (min-width: $sm) {
        margin: 0 10px 0 0;
      }
    }
    .btn--login {
      margin-bottom: 15px;

      @media (min-width: $sm) {
        margin: 0 10px 0 0;
      }
    }
    .btn {
      width: 100%;

      @media (min-width: $sm) {
        width: auto;
      }
    }
  }

  &__notfound {
    color: var(--color-tetriary);
  }

  &__notfound-link {
    margin-right: 15px;
    font-size: 18px;
    color: var(--color-primary);
  }
}

.task-details {
  display: flex;
  align-items: center;
  width: max(50%, calc(100% - 10px));
  margin-bottom: 10px;

  &__label {
    display: flex;
    width: clamp(25%, 100px, 50%);
    font-weight: 600;
    margin-right: 5px;
  }

  &__value{
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }
}
</style>