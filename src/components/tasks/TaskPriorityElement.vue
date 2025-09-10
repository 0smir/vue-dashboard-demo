<template>
  <div class="priority__wrapper">
    <span :class="['priority__icon', 'priority--' + priority]">
      <SvgIcon :name="priority" iconType="priority" class="icon--medium" />
    </span>
    <span v-if="titleDisplay" class="priority__title">{{ priority }}</span>
  </div>
</template>

<script>
export default {
  props: {
    priority: {
      type: String,
      required: true
    },
    titleDisplay: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.priority {
  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: flex;
    justify-content: center;
    padding: 2px;
    width: 22px;
    height: 22px;
    border-radius: $border-radius-small;
    color: $color-white;
  }

  &__title {
    margin-left: 7px;
    text-transform: capitalize;
  }
}
</style>