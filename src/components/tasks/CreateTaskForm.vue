<template>
  <form @submit.prevent="submitForm" :class="['form', 'form-add-task', 'form-' + className, className]">
    <div class="form__content">
      <div class="form-control form-control--title">
        <label class="form-control__label" for="title">Title</label>
        <input class="form-control__input" id="title" type="text" v-model="title.value">
      </div>
      <div class="form-control form-control--project">
        <label class="form-control__label" for="project">Select Project: </label>
        <select class="form-control__select" name="project-name" id="project" v-model="project.value">
          <option v-for="project in projectsList" :value="project.id">{{ project.title }}</option>
        </select>
      </div>
      <div class="form-control form-control--assignee">
        <label class="form-control__label" for="assignee">Assignee</label>
        <select class="form-control__select" name="assignee" id="assignee" v-model="assignee.value">
          <option class="form-control__select-option" v-for="person in assigneeList" :value="person.id">
            {{ person.name + ' ' + person.lastName }}
          </option>
        </select>
      </div>
      <div class="form-control form-control--status">
        <label class="form-control__label" for="status">Status</label>
        <select class="form-control__select" name="task-status" id="status" v-model="status.value">
          <option class="form-control__select-option" v-for="status in statusList" :value="status">{{ status }}</option>
        </select>
      </div>
      <div class="form-control form-control--priority">
        <label class="form-control__label" for="priority">Priority</label>
        <select class="form-control__select" name="task-priority" id="priority" v-model="priority.value">
          <option class="form-control__select-option" v-for="priority in priorityList" :value="priority">{{ priority }}
          </option>
        </select>
      </div>
      <div class="form-control form-control--description">
        <label class="form-control__label" for="description">Description</label>
        <textarea class="form-control__textarea" name="task-description" id="description" rows="5"
          v-model="description.value"></textarea>
      </div>
      <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--add" type="submit">Add Task</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel">Cancel</BaseButton>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['className'],
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
      return this.$store.getters['projects/getProjects'];
    },
    assigneeList() {
      return this.$store.getters['people/getEmployeesList'];
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
      let taskID = this.project.value.slice(0, 1).toUpperCase() + '-' + new Date().getTime();
      console.log(taskID);
      let formData = {
        id: taskID,
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

<style lang="scss">
.btn {
  &-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    @media (min-width: $md) {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &--add {
    width: 100%;
    margin-bottom: 10px;

    @media (min-width: $md) {
      width: auto;
      order: 2;
      margin-bottom: 0;
    }
  }

  &--cancel {
    width: 100%;

    @media (min-width: $md) {
      margin: 0 10px 0 0;
      width: auto;
    }
  }
}

.form__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 760px;
  margin: 0 auto;

  .form-control {
    width: calc(50% - 7px);

    &:last-of-type {
      margin-bottom: 0;
    }

    &--title,
    &--description,
    &--btn-wrapper {
      width: 100%;
    }
  }
}

.form-dialog {
  .form-control {
    margin-bottom: 15px;

    &__label {
      margin-bottom: 2px;
      font-size: 14px;
    }

    &__input,
    &__select {
      padding: 8px;
    }

    &__textarea {
      height: 80px;
    }
  }
}
</style>