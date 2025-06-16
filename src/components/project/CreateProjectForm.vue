<template>
  <form @submit.prevent="submitForm" :class="['form', 'form-add-project']">
    <div class="form__content">
      <div v-if="error" class="form-control">
        <p  class="error-text">{{ error }}</p>
      </div>
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
      <div :class="['form-control', 'form-control--owner']">
        <p><span>Project Ownre: </span> <strong>{{owner}}</strong></p>
      </div>
      <div :class="['form-control', 'form-control--members', { error: !project.members.isValid }]">
        <label class="form-control__label" for="description">Choose Members:</label>
        <BoardFilterParamsItem :options="project.members.value"
                                mode="persons"
                               @remove-filter-item="removeEmployee"/>
        <PeopleDropdown v-model="project.members.value"
                            :options="employees"
                            placeholder="Select People"
            />
      </div>
      <div :class="['form-control', 'form-control--status', { error: !project.status.isValid }]">
        <h4 class="title">Choose project status:</h4>
        <label class="form-control__label form-control__label--radio" v-for="statusItem in statusList"
          :key="statusItem.id">
          <input class="form-control__input-radio" type="radio" :name="statusItem.value" :value="statusItem.id"
            v-model="project.status.value">
          <span>{{ statusItem.value }}</span>
        </label>
        <p class="error-text" v-if="!project.status.isValid">{{ project.status.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--priority', { error: !project.priority.isValid }]">
        <h4 class="title">Choose project priority:</h4>
        <label class="form-control__label form-control__label--radio" v-for="priorityItem in priorityList"
          :key="priorityItem.id">
          <input class="form-control__input-radio" type="radio" :name="priorityItem.value" :value="priorityItem.id"
            v-model="project.priority.value">
          <span>{{ priorityItem.value }}</span>
        </label>
        <p class="error-text" v-if="!project.priority.isValid">{{ project.priority.errorMessage }}</p>
      </div>
      <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--add" type="submit">Create Project</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel">Cancel</BaseButton>
      </div>
    </div>
  </form>
</template>

<script>
import BoardFilterParamsItem from '@/components/board/BoardFilterParamsItem.vue';
import PeopleDropdown from '@/components/board/PeopleDropdown.vue';
export default {
  components: {
    BoardFilterParamsItem,
    PeopleDropdown
  },
  emits:['on-project-create'],
  props: ['employees'],
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
      },
      error: null
    }
  },
  computed: {
    owner() {
      let userInfo = this.$store.getters['users/getUserInfo'];
      return `${userInfo?.name} ${userInfo?.lastName}`;
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
      this.isFormValid = true;
      if (this.project.title.value === '') {
        this.project.title.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.project.description.value === '') {
        this.project.description.isValid = false;
        this.isFormValid = false;
        return;
      }
    },

    removeEmployee(params) {
      let { option } = params,
        targetItem = option.id,
        membersList = this.project.members.value,
        itemIndex = membersList.indexOf(targetItem);
      membersList.splice(itemIndex, 1);
    },

    async createProject() {
      let newProjectData = {
        id: new Date().getTime(),
        title: this.project.title.value,
        description: this.project.description.value,
        owner: this.owner,
        members: this.project.members.value,
        boards: this.project.boards.value,
        priority: this.project.priority.value,
        status: this.project.status.value,
      };
      try {
        this.$store.dispatch('projects/createProject', newProjectData);
        this.$emit('on-project-create', {
          created: true,
          projParams: { id: newProjectData.id, title: newProjectData.title}
        });
        this.clearErrors();
        this.clearFormFields();
      } catch (error) {
        if (error.message) {
          this.isFormValid = false;
          this.error = 'An unexpected error occurred. Please try again.';
        }
      }
    },
    clearFormFields() {
      this.project.title.value = '';
      this.project.description.value = '';
      this.project.members.value = [];
      this.project.boards.value = [];
      this.project.priority.value = 'low';
      this.project.status.value = 'active';
    },
    clearErrors() {
      this.isFormValid = true;
      this.error = null;
      this.project.title.isValid = true
      this.project.description.isValid = true
      this.project.members.isValid = true
      this.project.boards.isValid = true
      this.project.priority.isValid = true
      this.project.status.isValid = true 
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control__label--radio {
  margin-right: 20px;
}
</style>