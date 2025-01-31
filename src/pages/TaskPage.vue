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
        <TaskAssigneeDetails :assigneeFullName="assigneeFullName"/>
        <TaskPriorityDetails :taskPriorityList="taskPriorityList"
                             :priorityTitle="taskInfo.priority"
                             @choose-action="updateTaskParams"
        />
        <TaskProjectDetails v-if="taskInfo?.project" 
                            :projectsList="projectsList" 
                            :title="taskInfo.project"
                            @choose-action="updateTaskParams"
        />
        <TaskReporterDetails :reporter="taskInfo.reporter" />
        <div v-if="taskInfo?.estimateTime" class="task-details task-details__time task-details--time-estimated">
          <span class="task-details__label task-details__label--time-estimated">Estimated: </span>
          <span class="task-details__value task-details__value--time-estimated"> {{ taskInfo?.estimateTime + 'h' }}</span>
        </div>
        <TaskTreckedTimeDetails v-if="taskInfo?.estimateTime && taskInfo?.loggedTime" :isLabelVisible="true" :estimated="taskInfo?.estimateTime" :trecked="taskInfo?.loggedTime"/>

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
      <div>
       <TaskActivityComponent :activity="taskUpdatesHistory"/>
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
import TaskActivityComponent from '@/components/tasks/TaskActivityComponent.vue';
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
      showDeleteConfirmationModal: false
    }
  }, 
  computed: {
    taskInfo() {
      return this.$store.getters['tasks/getTaskInfo'];
    },
    hasTaskInfo() {
      return !this.isLoading && (this.taskInfo !== null);
    },
    projectsList() {
      return this.$store.getters['projects/getProjects'];
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
    assigneeFullName() {
      const assignee = this.taskInfo?.assignee;
      return assignee ? `${assignee.name} ${assignee.lastName}` : 'Unassigned';
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

      this.$store.dispatch('tasks/updateTask', { id: this.taskInfo.id, mode: mode, ...params });
    
      // if (mode === 'assignee') {
      //   this.$store.dispatch('tasks/setTaskAssignee', { id: this.taskInfo.id, mode: mode, assignee: newVal });
      // }
      // if (mode === 'reporter') {
      //   this.$store.dispatch('tasks/setTaskReporter', { id: this.taskInfo.id, mode: mode, reporter: newVal });
      // }
    },
    async actionExecute(newParams) {
      
      let { newVal } = newParams;
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

    @media (min-width: $md) {
      padding-top: 25px;
      order: 1;
      max-width: calc(65% - 10px);
      height: 50vh;
    }
  }

  &__title {
    font-size: 2.4rem;
    margin: 0 0 10px;

    @media (min-width: $md) {
      font-size: 2.8rem;
      margin: 0 0 20px;
    }
  }

  &__descrioption {
    color: var(--color-tetriary);
    padding: 5px;
    margin-bottom: 20px;
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