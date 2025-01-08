<template>
  <div v-if="taskInfo" class="task-info task-info__container">
    <div class="task-info__details">

      <div class="task-info__actions-wrapper">
        <SmartBox :list="taskStatusList" :title="taskStatus" mode="status"
          :classList="['btn', 'btn--medium', 'btn__outlined', 'task-info__btn-action', 'btn-action--status-updata']"
          @update-params="updateTaskParams">
          <template #list-items="{ list, selectItem }">
            <li class="smart-box__list-item" v-for="item in list" :key="item" @click.stop="selectItem(item)">
              <BaseButton class="btn btn--transparent smart-box__btn smart-box__btn-action">
                <span class="btn-text">{{ item }}</span>
              </BaseButton>
            </li>
          </template>
        </SmartBox>
        <SmartBox :list="taskActionsList" mode="actions" @task-interaction="actionExecute">
          <template #active-item>
            <BaseButton class="btn btn--medium btn--transparent task-info__btn-action btn-action--action smart-box__btn smart-box__btn-control">
              <SvgIcon class="icon icon--medium smart-box__btn-icon" name="flash"/>
              <span class="btn-action__title">Actions</span>
              <SvgIcon class="icon icon--medium smart-box__btn-icon" name="chevron-down"/>
            </BaseButton>
          </template>
          <template #list-items="{ list, selectItem }">
            <li class="smart-box__list-item" v-for="item in list" :key="item" @click.stop="selectItem(item)">
              <BaseButton class="btn btn--transparent smart-box__btn smart-box__btn-action">
                <span class="btn-text">{{ item }}</span>
              </BaseButton>
            </li>
          </template>
        </SmartBox>
      </div>

      <div class="task-info__details-wrapper">
        <div class="task-details task-details--assignee" v-if="assigneeFullName">
          <span class="task-details__label task-details__label--assignee">Assignee:</span>
          <span class="task-details__value task-details__value--assignee"> {{ assigneeFullName }}</span>
        </div>
        <div class="task-details task-details--priority">
          <span class="task-details__label task-details__label--priority">Priority:</span>
          <div class="task-details__value task-details__value--priority">
            <SmartBox :list="taskPriorityList" :title="taskInfo.priority" mode="priority"
              @update-params="updateTaskParams"
              :classList="['btn', 'btn--medium', 'btn__outlined', 'task-info__btn-action', 'btn-action--action']">
              <template #active-item>
                <BaseButton class="btn btn--medium btn--transparent smart-box__btn smart-box__btn-control">
                  <TaskPriorityElement :priority="taskInfo.priority" :titleDisplay="true" />
                  <SvgIcon class="icon icon--medium smart-box__btn-icon" name="chevron-down" />
                </BaseButton>
                
              </template>
              <template #list-items="{ list, selectItem }">
                <li v-for="item in list" :key="item"
                  :class="['smart-box__list-item', { hidden: item === taskInfo.priority }]">
                  <TaskPriorityElement :priority="item" :titleDisplay="true" @click.stop="selectItem(item)" />
                </li>
              </template>
            </SmartBox>
          </div>
        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.project">
          <span class="task-details__label task-details__label--creator">Project: </span>
          <SmartBox :list="projectsList" :title="taskInfo.project" mode="project" @update-params="updateTaskParams"
            :classList="['btn', 'btn--medium', 'btn__outlined', 'task-info__btn-action', 'btn-action--action']">
            <template #list-items="{ list, selectItem }">
              <li class="smart-box__list-item" v-for="item in list" :key="item">
                <BaseButton class="btn btn--transparent smart-box__btn smart-box__btn-action"
                  @click.stop="selectItem(item.title)">
                  <span class="btn-text">{{ item.title }}</span>
                </BaseButton>
              </li>
            </template>
          </SmartBox>

        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.creator">
          <span class="task-details__label task-details__label--creator">Reporter: </span>
          <span class="task-details__value task-details__value--creator"> {{ creatorFullName }}</span>
        </div>
        <div class="task-details task-details--creator" v-if="taskInfo?.estimate">
          <span class="task-details__label task-details__label--creator">Time tracking: </span>
          <span class="task-details__value task-details__value--creator"> {{ taskInfo?.estimate }}</span>
        </div>
      </div>
    </div>

    <div class="task-info__task-data">
      <div class="task-info__main">
        <h1 class="task-info__title">{{ id }}: {{ taskInfo?.title }}</h1>
        <div class="task-info__descrioption-wrapper">
          <span class="task-info__label task-info__label--description">Description:</span>
          <div class="task-info__descrioption">
            <p class="text">{{ taskInfo?.description }}</p>
          </div>
        </div>
      </div>
      <div>
       <TaskCommentsBlock />
      </div>
    </div>
  </div>
  <p v-if="error">Error</p>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
import BaseButton from '@/components/UI/base-components/BaseButton.vue';
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import TaskCommentsBlock from '@/components/tasks/TaskCommentsBlock.vue';
export default {
  components: {
    TaskPriorityElement,
    SmartBox,
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
      return this.taskInfo.status;
    },
    assigneeFullName() {
      let fullName = this?.taskInfo?.assignee.name + ' ' + this?.taskInfo?.assignee.lastName
      return fullName;
    },
    creatorFullName() {
      let fullName = this?.taskInfo?.creator.name + ' ' + this?.taskInfo?.creator.lastName
      return fullName;
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