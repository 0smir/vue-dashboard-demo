<template>
  <div v-if="mode === 'columns'" class="filter-params__block columns-list">
    <div v-for="option in options" :class="['filter-params__column-item', option == 'Active' ? 'active-status' : option.toLowerCase() ]" :title="option">
      {{ option }}
      <BaseButton class="filter-params__btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove column ${option}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
  <div v-if="mode === 'persons'" class="filter-params__block people-list">
    <div v-for="option in options" class="filter-params__people-item">
      <UserProfileInfo :userInfo="option" theme="light" :showName="false" size="small"/>
      <BaseButton class="filter-params__btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove person ${option.name} ${option.lastname}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
  <div v-if="mode === 'priority'" class="filter-params__block columns-list">
    <div v-for="option in options" class="filter-params__priority-item">
      <TaskPriorityElement :priority="option" :titleDisplay="true" />
      <BaseButton class="filter-params__btn-remove" @click="removeItem(option, mode)" :aria-label="`click to remove priority item ${option}`">
        <SvgIcon name="close" class="icon icon--small" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import UserProfileInfo from '@/components/auth/UserProfileInfo.vue';
import TaskPriorityElement from '@/components/tasks/TaskPriorityElement.vue';

export default {
  components: {
    UserProfileInfo,
    TaskPriorityElement
  },
  emits:['remove-filter-item'],
  props: ['options', 'mode'],
  methods: {
    removeItem(option, mode) {
      let params = {
        option, mode
      }
      this.$emit('remove-filter-item', params);
    }
  }
    
}
</script>

<style lang="scss" scoped>

</style>