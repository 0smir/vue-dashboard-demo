<template>
  <div class="container">
    <AddPersonForm />
    <PersonsList :peopleList="peopleList" />
  </div>
</template>

<script>
import AddPersonForm from '@/components/people/AddPersonForm.vue';
import PersonsList from '@/components/people/PersonsList.vue';

export default {
  components: {
    AddPersonForm,
    PersonsList
  },
  data() {
    return {
      peopleList: this.$store.getters['people/getEmployeesList']
    }
  },

  methods: {
    async loadUsersList() {
      this.$store.dispatch('people/loadEmployeesList');
    }
  },

  mounted() {
    this.loadUsersList();
  }

}
</script>

<style lang="scss" scoped></style>