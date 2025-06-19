<template>
  <div class="task-details task-details--assignee" v-if="assigneeFullName">
    <span class="task-details__label task-details__label--assignee">Assignee:</span>

    <div class="task-details__value task-details__value--assignee" @click="loadUsersList">
      <SmartBox mode="assignee" @update-params="changeAssigneeName">
        <template #active-item>
          <BaseButton class="btn btn--medium btn--transparent btn-assignee__controller" 
                      :aria-label="`current assegnee is: ${assigneeFullName}. Click to see list of employees`">
            <UserProfileInfo :userInfo="assignee" theme="blue" :showName="true" size="small"/>
            <SvgIcon name="edit" class="icon icon--small icon--edit"/>
          </BaseButton>
        </template>
        <template v-if="personsList" #list-items="{ list, selectItem }">
          <li v-for="item in personsList" :key="item.id" :id="item.id"
            :class="['smart-box__list-item', { hidden: item.id === assignee.id }]"
          >
            <UserProfileInfo :userInfo="item" theme="blue" :showName="true" size="small" @click.stop="selectItem(item)"/>
          </li>
        </template>
      </SmartBox>
    </div>
  </div>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import UserProfileInfo from '@/components/auth/UserProfileInfo.vue';

export default {
  props: ['assignee'],
  components: {
    SmartBox,
    UserProfileInfo
  },
  emits: ['update-assignee'],
  computed: {
    assigneeFullName() {
      const assignee = this.assignee;
      return assignee ? `${assignee.name} ${assignee.lastName}` : 'Unassigned';
    },
    personsList() {
      return this.$store.getters['people/getEmployeesList'];
    }
  },
  methods: {
    changeAssigneeName(payload) {
      this.$emit('update-assignee', payload);
    },

    async loadUsersList() {
      if (!this.personsList.length ) {
        try {
          await this.$store.dispatch('people/loadEmployeesList');
        } catch (error) {
          this.error = error.message || 'Smth went wrong!';
        }
      }
    }
  } 
}
</script>

<style lang="scss" >
.task-details--assignee{
  position: relative;

  &:hover{ 
    .btn__edit-assignee {
      visibility: visible;
    }
  }
}
.btn__edit-assignee {
  visibility: hidden;
  padding: 0;
  height: 25px;
  width: 25px;
  border-radius: 4px;
  transition: all .35s ease;
  &:hover {
    .icon--edit{
      color: var(--color-white);
    }
  }
}

.btn-assignee__controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: auto;
  padding-inline: 0 0;
  .icon--edit {
    visibility: hidden;
    margin-left: 4px;
  }
  &:hover,
  &:focus {
    .icon--edit {
      visibility: visible;
    }
  }
}

</style>