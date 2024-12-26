<template>
  <form @submit.prevent="submitForm" :class="['form', 'form-add-project']">
    <div class="form__content">
      <div :class="['form-control', 'form-control--title', { error: !project.title.isValid }]">
        <label class="form-control__label" for="title">Title</label>
        <input class="form-control__input" id="title" type="text" v-model="project.title.value">
        <p class="error-text" v-if="!project.title.isValid">{{ project.title.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--description', { error: !project.description.isValid }]">
        <label class="form-control__label" for="description">Project description: </label>
        <textarea class="form-control__textarea" name="project-description" id="description" rows="5"
          v-model="project.description.value"></textarea>
        <p class="error-text" v-if="!project.description.isValid">{{ project.description.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--owner', { error: !project.owner.isValid }]">

      </div>
      <div :class="['form-control', 'form-control--members', { error: !project.members.isValid }]">

      </div>
      <div :class="['form-control', 'form-control--boards']">
        <p class="description-text">{{ project.boards.descriptions }}</p>
      </div>
      <div :class="['form-control', 'form-control--status', { error: !project.status.isValid }]">
        <label class="form-control__label" v-for="statusItem in statusList" :key="statusItem.id">
          <input type="radio" :name="statusItem.value" :value="statusItem.id" v-model="project.status.value">
          <span>{{ statusItem.value }}</span>
        </label>
        <p class="error-text" v-if="!project.status.isValid">{{ project.status.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--priority', { error: !project.priority.isValid }]">
        <label class="form-control__label" v-for="priorityItem in priorityList" :key="priorityItem.id">
          <input type="radio" :name="priorityItem.value" :value="priorityItem.id" v-model="project.priority.value">
          <span>{{ priorityItem.value }}</span>
        </label>
        <p class="error-text" v-if="!project.priority.isValid">{{ project.priority.errorMessage }}</p>
      </div>

    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      statusList: this.$store.getters['projects/getStatusList'],
      priorityList: this.$store.getters['projects/getPriorityList'],
      isFormValid: true,
      project: {
        title: {
          value: '',
          errorMessage: 'Project title is required and cannot be empty.',
          isValid: true
        },
        description: {
          value: '',
          errorMessage: 'Project description is required and cannot be empty.',
          isValid: true
        },
        owner: {
          value: null,
          errorMessage: 'Please choose project owner.',
          isValid: true
        },
        members: {
          value: [],
          errorMessage: 'Please add at least one project members.',
          isValid: true
        },
        boards: {
          value: [],
          description: 'You can add boards later.',
          isValid: true
        },
        priority: {
          value: 'low',
          errorMessage: 'Please choose project priority.',
          isValid: true
        },
        status: {
          value: 'active',
          errorMessage: 'Please add project status.',
          isValid: true
        }

      }
    }
  },

  methods: {
    submitForm() {
      console.log('submit form');
      this.validateForm();
      if (!this.isFormValid) return;
      this.createProject();
    },
    validateForm() {
      console.log('validateForm');
    },
    createProject() {
      console.log('createProject');
    }
  }

}
</script>

<style lang="scss" scoped></style>