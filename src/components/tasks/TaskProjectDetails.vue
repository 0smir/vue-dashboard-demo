<template>
  <div class="task-details task-details--project">
    <span class="task-details__label task-details__label--project">Project: </span>
    <div class="task-details__value task-details__value--project" @click="loadProjectsList">
      <SmartBox :list="projectsList" :title="title" mode="project" @update-params="updateTaskParams"
        :classList="['btn', 'btn--medium', 'btn--transparent', 'btn-project__controller']">
        <template #list-items="{ list, selectItem }">
          <li  v-if="!list.length" class="smart-box__list-item">
            <BaseSpinner />
          </li>
          <li v-else class="smart-box__list-item" v-for="item in list" :key="item.id">
            <BaseButton class="btn btn--transparent btn-project__project-item"
                        :id="item.id"
                        @click.stop="selectItem(item)">
              <span class="btn-text">{{ item.title }}</span>
            </BaseButton>
          </li>
        </template>
      </SmartBox>
    </div>
  </div>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import BaseSpinner from '../UI/base-components/BaseSpinner.vue';
export default {
  props: ['title'],
  emits: ['choose-action'],
  components: {
    SmartBox
  },
  computed: {
    projectsList() {
      return this.$store.getters['projects/getProjects'];
    }
  },
  methods: {
    updateTaskParams(payload) {
      let { mode, newVal } = payload;
      let options = {
        id: newVal.id,
        title: newVal.title
      };
      
      this.$emit('choose-action', {mode, newVal: options});
    },
    async loadProjectsList() {
      if (!this.projectsList.length) {
        try {
          await this.$store.dispatch('projects/loadProjectsList');
        } catch (error) {
          this.error = error.message || 'Smth went wrong!';
        }
      }
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