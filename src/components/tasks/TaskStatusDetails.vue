<template>
  
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
    </div>
  

</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
export default {
  components: {
    TaskPriorityElement,
    SmartBox
  },
  props: ['taskStatusList', 'taskStatus'],
  emits: ['choose-action'],
  methods: {
    updateTaskParams(payload){
      this.$emit('choose-action', payload);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>