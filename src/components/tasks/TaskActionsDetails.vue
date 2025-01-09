<template>
  <SmartBox :list="taskActionsList" :mode="mode" @task-interaction="actionExecute">
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

</style>