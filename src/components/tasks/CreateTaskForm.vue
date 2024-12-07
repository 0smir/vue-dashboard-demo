<template>
  <form @submit.prevent="submitForm" :class="['form', 'form-add-task', 'form-' + className, className]">
    <div class="form__content">
      <div :class="['form-control', 'form-control--title', { error: !task.title.isValid }]">
        <label class="form-control__label" for="title">Title</label>
        <input class="form-control__input" id="title" type="text" v-model="task.title.value">
        <p class="error-text" v-if="!task.title.isValid">{{ task.title.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--project', { error: !task.project.isValid }]">
        <label class="form-control__label" for="project">Select Project: </label>
        <select class="form-control__select" name="project-name" id="project" v-model="task.project.value">
          <option v-for="project in projectsList" :value="project.id">{{ project.title }}</option>
        </select>
        <p class="error-text" v-if="!task.project.isValid">{{ task.project.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--assignee', { error: !task.assignee.isValid }]">
        <label class="form-control__label" for="assignee">Assignee</label>
        <select class="form-control__select" name="assignee" id="assignee" v-model="task.assignee.value">
          <option class="form-control__select-option" v-for="person in assigneeList" :value="person.id">
            {{ person.name + ' ' + person.lastName }}
          </option>
        </select>
        <p class="error-text" v-if="!task.assignee.isValid">{{ task.assignee.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--status', { error: !task.status.isValid }]">
        <label class="form-control__label" for="status">Status</label>
        <select class="form-control__select" name="task-status" id="status" v-model="task.status.value">
          <option class="form-control__select-option" v-for="(status, index) in statusList" :value="status"
            :key="status">{{ status }}</option>
        </select>
        <p class="error-text" v-if="!task.status.isValid">{{ task.status.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--priority', { error: !task.priority.isValid }]">
        <label class="form-control__label" for="priority">Priority</label>
        <select class="form-control__select" name="task-priority" id="priority" v-model="task.priority.value">
          <option class="form-control__select-option" v-for="priority in priorityList" :value="priority">{{ priority }}
          </option>
        </select>
        <p class="error-text" v-if="!task.priority.isValid">{{ task.priority.errorMessage }}</p>
      </div>
      <div :class="['form-control', 'form-control--description', { error: !task.description.isValid }]">
        <label class="form-control__label" for="description">Description</label>
        <textarea class="form-control__textarea" name="task-description" id="description" rows="5"
          v-model="task.description.value"></textarea>
        <p class="error-text" v-if="!task.description.isValid">{{ task.description.errorMessage }}</p>
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
      task: {
        title: {
          value: '',
          errorMessage: 'Task title is required and cannot be empty.',
          isValid: true
        },
        project: {
          value: '',
          errorMessage: 'Select a project before creating the task.',
          isValid: true
        },
        assignee: {
          value: '',
          errorMessage: 'Please assign the task to a valid team member.',
          isValid: true
        },
        priority: {
          value: 'trivial',
          isValid: true
        },
        status: {
          value: 'toDo',
          isValid: true
        },
        description: {
          value: '',
          errorMessage: 'Task description must be provided for clarity.',
          isValid: true
        }
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

      if (this.task.title.value === '') {
        this.task.title.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.task.project.value === '') {
        this.task.project.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.task.assignee.value === '') {
        this.task.assignee.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.task.description.value === '') {
        this.task.description.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.task.priority.value === '') {
        this.task.priority.isValid = false;
        this.isFormValid = false;
        return;
      }
      if (this.task.status.value === '') {
        this.task.status.isValid = false;
        this.isFormValid = false;
        return;
      }
    },

    submitForm() {
      this.validateForm();
      if (!this.isFormValid) return;
      this.addTask();
    },

    addTask() {
      let taskID = this.task.project.value.slice(0, 1).toUpperCase() + '-' + new Date().getTime();
      console.log(taskID);
      let formData = {
        id: taskID,
        title: this.task.title.value,
        project: this.task.project.value,
        assignee: this.task.assignee.value,
        description: this.task.description.value,
        priority: this.task.priority.value,
        status: this.task.status.value
      };

      this.$store.dispatch('tasks/addTask', formData);
      this.clearFormFields();
    },

    clearFormFields() {
      this.task.title.value = '';
      this.task.project.value = '';
      this.task.assignee.value = '';
      this.task.description.value = '';
      this.task.priority.value = '';
      this.task.status.value = '';
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
      margin-top: 45px;
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

    &--description {
      margin-bottom: 0;
    }
  }

  .btn {
    &-wrapper {
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 20px;
    }

    &--add {
      margin-bottom: 0;
      order: 2;
    }

    &--add,
    &--cancel {
      width: auto;
    }
  }
}
</style>