<template>
  <div v-if="taskInfo !== null" class="task-info task-info__container">
    <div class="task-info__details">
      <div class="task-info__actions-wrapper">
        <TaskStatusDetails :taskStatusList="taskStatusList" :taskStatus="taskStatus" @choose-action="updateTaskParams"/>
        <TaskActionsDetails :taskActionsList="taskActionsList" mode="actions" @choose-action="actionExecute"/>
      </div>
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
        <div class="task-details task-details__time task-details--time-estimated">
          <span class="task-details__label task-details__label--time-estimated">Estimated: </span>
          <span class="task-details__value task-details__value--time-estimated"> {{ taskInfo?.estimateTime }}</span>
        </div>
        <div class="task-details task-details__time task-details--time-trecked">
          <span class="task-details__label task-details__label--time-trecked">Time tracked: </span>
          <span class="task-details__value task-details__value--time-trecked"> {{ taskInfo?.logged }}</span>
        </div>
        <div v-if="taskInfo?.createdTime" class="task-details task-details__time task-details__time--created">
          <span class="task-details__label task-details__label--time-created">Created: </span>
          <span class="task-details__value task-details__value--time-created"> {{ createTime }}</span>
        </div>
        <div v-if="taskInfo?.updateTime" class="task-details task-details__time task-details__time--updated">
          <span class="task-details__label task-details__label--time-updated">Updated: </span>
          <span class="task-details__value task-details__value--time-updated"> {{ updateTime }}</span>
        </div>
      </div>
    </div>
    <div class="task-info__task-data">
      <TaskContent :taskInfo="taskInfo" />
      <div>
       <TaskCommentsBlock />
      </div>
    </div>
  </div>
  <div v-else class="task-info task-info__container">
    Oooops! We don't have task with number {{ id }}.
  </div>
  <p v-if="error">Error</p>
</template>

<script>
import TaskStatusDetails from '@/components/tasks/TaskStatusDetails.vue';
import TaskActionsDetails from '@/components/tasks/TaskActionsDetails.vue';
import TaskAssigneeDetails from '@/components/tasks/TaskAssigneeDetails.vue';
import TaskPriorityDetails from '@/components/tasks/TaskPriorityDetails.vue';
import TaskReporterDetails from '@/components/tasks/TaskReporterDetails.vue';
import TaskProjectDetails from '@/components/tasks/TaskProjectDetails.vue';

import TaskContent from '@/components/tasks/TaskContent.vue';
import TaskCommentsBlock from '@/components/tasks/TaskCommentsBlock.vue';
export default {
  components: {
    TaskStatusDetails,
    TaskActionsDetails,
    TaskAssigneeDetails,
    TaskPriorityDetails,
    TaskReporterDetails,
    TaskProjectDetails,
    TaskContent,
    TaskCommentsBlock
  },
  props: ['id'],
  data() {
    return {
      projectsList: this.$store.getters['projects/getProjects'],
      taskPriorityList: this.$store.getters['tasks/getPriorityList'],
      taskStatusList: this.$store.getters['tasks/getStatusList'],
      taskActionsList: this.$store.getters['tasks/getTaskActionsList'],
      error: null
    }
  }, 
  computed: {
    taskInfo() {
      return this.$store.getters['tasks/getTaskInfo'];
    },
    taskStatus() {
      return this?.taskInfo?.status;
    },
    assigneeFullName() {
      let fullName = this?.taskInfo?.assignee?.name + ' ' + this?.taskInfo?.assignee?.lastName
      return fullName;
    },
    createTime() {
      let creatinDate = new Date(this.taskInfo?.createdTime);
      let year    = creatinDate.getFullYear();
      let month   = creatinDate.getMonth() + 1;
      let day     = creatinDate.getDate();
      let hour    = creatinDate.getHours();
      let minute  = creatinDate.getMinutes();
      let seconds = creatinDate.getSeconds();  
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    },
    updateTime() {
      let updationDate = new Date(this.taskInfo?.updateTime);
      let year    = updationDate.getFullYear();
      let month   = updationDate.getMonth() + 1;
      let day     = updationDate.getDate();
      let hour    = updationDate.getHours();
      let minute  = updationDate.getMinutes();
      let seconds = updationDate.getSeconds();  
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    }
  },
  methods: {
    async getTaskData() {
      try {
        this.$store.dispatch('tasks/getTaskData', { id: this.id });
      } catch (error) {
        this.error = error.message || 'Smth went wrong!';
      }
    },
    updateTaskParams(newParams) {
      console.log(newParams);
      let { newVal, mode } = newParams;
      if (mode === 'status') {
        this.$store.dispatch('tasks/setTaskStatus', { ...this.taskInfo, status: newVal });
      }
      if (mode === 'priority') {
        this.$store.dispatch('tasks/setTaskPriority', { ...this.taskInfo, priority: newVal });
      }
      if (mode === 'project') {
        this.$store.dispatch('tasks/setTaskProject', { ...this.taskInfo, project: newVal });
      }
      if (mode === 'assignee') {
        this.$store.dispatch('tasks/setTaskAssignee', { ...this.taskInfo, assignee: newVal });
      }  
    },
    actionExecute(newParams) {
      console.log(newParams);
      let { newVal } = newParams;
      if (newVal === 'logtime') {
        
      }
      if (newVal === 'print') {
        
      }
      if (newVal === 'delate') {
        this.$store.dispatch('tasks/removeTask', {id: this.id})
      }
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
      order: 5;
      max-width: calc(35% - 10px);
      padding: 10px 7px;
      border-left: 2px solid var(--color-secondary-light);
      height: 50vh;
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

  &__actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__details-wrapper {
    padding: 10px 5px;
    border: 1px solid var(--color-secondary-light);
    border-radius: var(--border-radius-medium);
  }
}

.task-details {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &__label {
    font-weight: 600;
    margin-right: 5px;
  }

  .task__priority {
    display: inline-flex;
    margin-right: 5px;
  }
}

.btn-action__title{
  margin: 0 5px;
}
</style>