<template>
  <div class="task-details task-details--reporter" v-if="reporterFullName">
    <span class="task-details__label task-details__label--reporter">Reporter: </span>

    <div class="task-details__value task-details__value--reporter" @click="loadUsersList">
      <SmartBox mode="reporter" @update-params="changeReporterName">
        <template #active-item>
          <BaseButton class="btn btn--medium btn--transparent btn-reporter__controller" 
                      :aria-label="`current assegnee is: ${reporterFullName}. Click to see list of employees`">
            <UserProfileInfo :userInfo="reporter" theme="blue" :showName="true" size="small"/>
            <SvgIcon name="edit" class="icon icon--small icon--edit"/>
          </BaseButton>
        </template>
        <template v-if="personsList" #list-items="{ list, selectItem }">
          <li v-for="item in personsList" :key="item.id" :id="item.id"
            :class="['smart-box__list-item', { hidden: item.id === reporter.id }]"
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
  props: ['reporter'],
  emits: ['update-reporter'],
  components: {
    SmartBox,
    UserProfileInfo
  },
  computed: {
    reporterFullName() {
      return this.reporter ? `${this.reporter.name} ${this.reporter.lastName}` : 'Unassigned';
    },
    personsList() {
      return this.$store.getters['people/getEmployeesList'];
    }
  },
  methods: {
    changeReporterName(payload) {
      this.$emit('update-reporter', payload);
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

<style lang="scss" scoped>
.btn-reporter__controller {
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