<template>
  <div class="task-details task-details--creator">
    <span class="task-details__label task-details__label--creator">Project: </span>
    <SmartBox :list="projectsList" :title="title" mode="project" @update-params="updateTaskParams"
      :classList="['btn', 'btn--medium', 'btn--transparent', 'btn-project__controller']">
      <template #list-items="{ list, selectItem }">
        <li class="smart-box__list-item" v-for="item in list" :key="item">
          <BaseButton class="btn btn--transparent btn-project__project-item"
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

<style lang="scss" >
.btn-project {
  &__controller {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    text-transform: uppercase;

    span:first-of-type {
      margin: 0 auto 0 0;
    }
  }
  &__project-item {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    text-transform: uppercase;
  }
}

</style>