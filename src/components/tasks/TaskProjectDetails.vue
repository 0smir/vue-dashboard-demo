<template>
  <div class="task-details task-details--creator">
    <span class="task-details__label task-details__label--creator">Project: </span>
    <SmartBox :list="projectsList" :title="title" mode="project" @update-params="updateTaskParams"
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
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
export default {
  props: ['projectsList', 'title'],
  emits: ['choose-action'],
  components: {
    SmartBox
  },
  methods: {
    updateTaskParams(payload) {
      this.$emit('choose-action', payload);
    }
  }
    
  }
</script>

<style lang="scss" scoped>

</style>