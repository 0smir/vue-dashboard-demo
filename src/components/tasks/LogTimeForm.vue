<template>
  <form @submit.prevent="onFormSubmit" :class="['form', 'form-' + className, className]">
    <div class="form__content">
      <div :class="['form-control', 'form-control--time-spent', {error: !workLog.spentTime.isValid}]">
        <label class="form-control__label" for="time-spent">Time spent</label>
        <input id="time-spent" name="spent-time" class="form-control__input" type="number" min="0" max="999" @blur="onBlurLoggedTime" v-model.number="workLog.spentTime.value">
        <p class="form-control__field-description" v-show="workLog.spentTime.isValid"> Enter the number of hours you spent on this task (e.g., 2).</p>
        <p class="error-text" v-if="!workLog.spentTime.isValid">{{ workLog.spentTime.errorMessage }}</p>
      </div>

      <div :class="['form-control', 'form-control--date']">
        <label class="form-control__label" for="date">Date</label>
        <input ref="datapicker" name="date" class="form-control__input" type="date" id="date" pattern="YYYY-MM-DD" v-model="workLog.date.value">
      </div>
      <div :class="['form-control', 'form-control--title']">
        <label class="form-control__label" for="description">Work description</label>
        <textarea id="description" name="work-description" class="form-control__textarea" placeholder="Add your work description..." rows="15" v-model="workLog.description.value"></textarea>
      </div>
    </div>
    <div class="form-control form-control--btn-wrapper btn-wrapper">
        <BaseButton class="btn btn__default btn--medium btn--add" type="submit">Save</BaseButton>
        <BaseButton class="btn btn__outlined btn--medium btn--cancel" @click="closeModal">Cancel</BaseButton>
    </div>
  </form>
</template>

<script>
export default {
  props: ['className', 'id', 'trecked'],
  inject:['closeModal'],
  data() {
    return {
      isFormValid: true,
      error: null,
      workLog: {
        spentTime: {
          value: 0,
          errorMessage: 'This field is requered, please set time!',
          isValid: true
        },
        date: {
          value: ''
        },
        description: {
          value: ''
        }
      }
    }
  },
  methods: {
    onFormSubmit() {
      this.validateForm();
      if (!this.isFormValid) return;
      this.logTime();
    },
    validateForm() {
      this.isFormValid = true;
      if (this.workLog.spentTime.value == 0) {
        this.workLog.spentTime.isValid = false;
        this.isFormValid = false;
        return;
      }
    },
    async logTime() {
      let payload = {
        id: this.id,
        mode: 'logTime',
        loggedTime: this.trecked + this.workLog.spentTime.value,
        spentTime: this.workLog.spentTime.value,
        loggedTimeDate:  new Date(this.workLog.date.value).getTime(),
        loggedTimeDescription: this.workLog.description.value
      }
      try{
        await this.$store.dispatch('tasks/LogTime', payload);
      }
      catch(error) {
        this.error = error.message || 'Smth went wrong!';
      }
      
      this.clearFormFields();
      this.closeModal();
    },
    onBlurLoggedTime() {
      if (this.workLog.spentTime.value === '') {
        this.workLog.spentTime.value = 0;
      }
      if (this.workLog.spentTime.value > 0) {
        this.workLog.spentTime.isValid = true;
        this.isFormValid = false;
      }
    },
    clearFormFields() {
      this.workLog.spentTime.value = 0;
      this.workLog.date.value = this.currentDate;
      this.workLog.description.value = '';
    },
  },
  mounted() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    this.currentDate = `${year}-${month}-${day}`;
    this.workLog.date.value = `${year}-${month}-${day}`;
    this.$refs.datapicker.setAttribute('max', this.currentDate);
  }
    
}
</script>

<style lang="scss">

</style>