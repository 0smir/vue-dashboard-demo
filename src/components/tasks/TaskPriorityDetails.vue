<template>
  <div class="task-details task-details--priority">
    <span class="task-details__label task-details__label--priority">Priority:</span>
    <div class="task-details__value task-details__value--priority">
      <SmartBox :list="taskPriorityList" :title="priorityTitle" mode="priority" @update-params="updateTaskParams">
        <template #active-item>
          <BaseButton class="btn btn--medium btn--transparent btn-priority__controller">
            <TaskPriorityElement :priority="priorityTitle" :titleDisplay="true" />
            <SvgIcon class="icon icon--medium icon-chevron" name="chevron-down" />
          </BaseButton>
        </template>
        <template #list-items="{ list, selectItem }">
          <li v-for="item in list" :key="item"
            :class="['smart-box__list-item', { hidden: item === priorityTitle }]">
            <TaskPriorityElement :priority="item" :titleDisplay="true" @click.stop="selectItem(item)" />
          </li>
        </template>
      </SmartBox>
    </div>
  </div>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
export default {
  components: {
    TaskPriorityElement,
    SmartBox
  },
  props: ['taskPriorityList', 'priorityTitle'],
  emits: ['choose-action'],
  methods: {
    updateTaskParams(payload) {
      console.log(payload);
      this.$emit('choose-action', payload);
    }
  }   
}
</script>

<style lang="scss" scoped>
.btn-priority__controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: auto;
  padding-left: 0;
}
</style>