<template>
  <SmartBox :list="taskStatusList" :title="taskStatus" mode="mode"
    :classList="['btn', 'btn--medium', 'btn__outlined', 'btn-status__controller']"
    @update-params="updateTaskParams">
    <template #list-items="{ list, selectItem }">
      <li class="smart-box__list-item" v-for="item in list" :key="item" @click.stop="selectItem(item)">
        <BaseButton class="btn btn--transparent btn-status__status-item">
          <span class="btn-text">{{ item }}</span>
        </BaseButton>
      </li>
    </template>
  </SmartBox>
</template>

<script>
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
export default {
  components: {
    TaskPriorityElement,
    SmartBox
  },
  props: ['taskStatusList', 'taskStatus', 'mode'],
  emits: ['choose-action'],
  methods: {
    updateTaskParams(payload){
      this.$emit('choose-action', payload);
    }
  }
}
</script>

<style lang="scss" >
.btn-status {
  &__controller {
    background-color: var(--color-secondary-medium);
    text-transform: uppercase;
  }

  &__status-item {
    width: 100%;
    justify-content: flex-start;
    text-transform: uppercase;
  }
}
</style>