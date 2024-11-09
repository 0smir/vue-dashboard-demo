<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="title">Title</label>
      <input id="title" type="text" v-model="title.value">
    </div>
    <div class="form-control">
      <label for="project">Select Project: </label>
      <select name="project-name" id="project" v-model="project.value">
        <option v-for="project in projectsList" :value="project.id">{{ project.title }}</option>
      </select>
    </div>
    <div class="form-control">
      <label for="assignee">Assignee</label>
      <select name="assignee" id="assignee" v-model="assignee.value">
        <option value=""></option>
      </select>
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea name="task-description" id="description" rows="5" v-model="description.value"></textarea>
    </div>
    <div class="form-control">
      <label for="priority">Priority</label>
      <select name="task-priority" id="priority" v-model="priority.value">
        <option v-for="priority in priorityList" :value="priority">{{ priority }}</option>
      </select>
    </div>
    <div class="form-control">
      <label for="status">Status</label>
      <select name="task-status" id="status" v-model="status.value">
        <option v-for="status in statusList" :value="status">{{ status }}</option>
      </select>
    </div>
    <div class="form-control btn-wrapper">
      <BaseButton>Cancel</BaseButton>
      <BaseButton type="submit">Add Task</BaseButton>
    </div>

  </form>
</template>

<script>
export default {
  data() {
    return {
      title: {
        value: '',
        isValid: true
      },
      project: {
        value: '',
        isValid: true
      },
      assignee: {
        value: '',
        isValid: true
      },
      description: {
        value: '',
        isValid: true
      },
      priority: {
        value: '',
        isValid: true
      },
      status: {
        value: '',
        isValid: true
      },
      isFormValid: true
    }
  },
  computed: {
    statusList() {
      return this.$store.getters['tasks/getStatusList'];
    },
    priorityList() {
      return this.$store.getters['tasks/getPriorityList'];
    },
    projectsList() {
      return this.$store.getters['projects/getProgects'];
    }
  },
  methods: {
    validateForm() {
      this.isFormValid = true;

      if (this.title.value === '') {
        this.title.isValid = false;
        this.isFormValid = false;
      }
      if (this.project.value === '') {
        this.project.isValid = false;
        this.isFormValid = false;
      }
      if (this.assignee.value === '') {
        this.assignee.isValid = false;
        this.isFormValid = false;
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.isFormValid = false;
      }
      if (this.priority.value === '') {
        this.priority.isValid = false;
        this.isFormValid = false;
      }
      if (this.status.value === '') {
        this.status.isValid = false;
        this.isFormValid = false;
      }
    },

    submitForm() {
      this.validateForm();
      if (!this.isFormValid) return;
      this.addTask();
    },

    addTask() {
      console.log('Task added!');
      let formData = {
        title: this.title.value,
        project: this.project.value,
        assignee: this.assignee.value,
        description: this.description.value,
        priority: this.priority.value,
        status: this.status.value
      };

      this.$store.dispatch('tasks/addTask', formData);
      this.clearFormFields();
    },

    clearFormFields() {
      this.title.value = '';
      this.project.value = '';
      this.assignee.value = '';
      this.description.value = '';
      this.priority.value = '';
      this.status.value = '';
    }
  }

}
</script>

<style scoped></style>