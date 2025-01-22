<template>
  <SmartBox :list="taskActionsList" :mode="mode" @task-interaction="actionExecute">
    <template #active-item>
      <BaseButton class="btn btn--medium btn--transparent btn-actions__controller">
        <SvgIcon class="icon icon--medium" name="flash"/>
        <span class="btn-actions__title">Actions</span>
        <SvgIcon class="icon icon--small icon-chevron" name="chevron-down"/>
      </BaseButton>
    </template>
    <template #list-items="{ list, selectItem }">
      <li class="smart-box__list-item" v-for="item in list" :key="item" @click.stop="selectItem(item)">
        <BaseButton class="btn btn--transparent btn-actions__action-item">
          <span class="btn-text">{{ item }}</span>
        </BaseButton>
      </li>
    </template>
  </SmartBox>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
export default {
  components: {
    SmartBox
  },
  props: ['taskActionsList', 'mode'],
  emits: ['choose-action'],
  methods: {
    actionExecute(payload) {
      this.$emit('choose-action', payload);
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-actions {
  &__controller {
    min-height: auto;
    padding: 5px 10px;
    text-transform: uppercase;
  }

  &__title {
    margin: 0 auto;
  }
  
  &__action-item {
    width: 100%;
    justify-content: flex-start;
    text-transform: uppercase;
  }
}

</style>