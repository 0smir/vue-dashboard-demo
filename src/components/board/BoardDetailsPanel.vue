<template>
  <div class="board__details">
    <ul class="board__details-list">
      <li class="board__details-list-item">
        <BaseButton class="btn btn__outlined btn--small board__btn-priority" @click="makeStarred">
          <SvgIcon v-if="!starred" class="icon icon-star--outlined" name="starOutline"/>
          <SvgIcon v-else class="icon icon-star--solid" name="starSolid"/>
        </BaseButton>
      </li>
      <li class="board__details-list-item">
        tasks: {{ taskCount }}
      </li>
      <li class="board__details-list-item">
        <router-link class="board__settings board__link board__settings-link">
          <SvgIcon class="icon icon--small" name="puzzle" />
          <span class="text">Customize</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['id', 'starred', 'taskCount'],
  emits: ['update-board'],
  computed: {
    customizationUrl() {
      return 'settings/' + this.id;
    }
  },
  methods: {
    makeStarred() {
      let data = {
        type: 'starred',
        newValue: !this.starred
      }
      
      this.$emit('update-board', data);
    }
  } 
}
</script>

<style lang="scss" >
.board {

  &__details {
    margin-bottom: 15px;
  }
  &__details-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__details-list-item {
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  &__btn-priority,
  &__btn-priority:hover {
    background-color: $color-white;
    color: $color-inprogress;
    border-color: transparent;
  }
  &__btn-priority:hover {
    border-color:  $color-secondary-medium;
  }
  &__settings-link {
    display: flex;
    padding: 8px 15px;
    align-items: center;
    color: $color-primary;
    font-weight: 500;
    border-radius: $border-radius-medium;
      &>.icon {
        transform: scale(1);
        transition: transform 0.35s ease;
      }
    
    &:hover{
      background-color: $color-primary-light;
      text-decoration: none;

      &>.icon {
        transform: scale(1.2);
        transition: transform 0.35s ease;
      }
    }
    &>.text{
      margin-left: 5px;
    }
  }
}

</style>