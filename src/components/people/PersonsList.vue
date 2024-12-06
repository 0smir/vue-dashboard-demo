<template>
  <div v-if="!peopleList">
    <p>Users list is empty.</p>
  </div>
  <div v-else class="userslist__wrapper">
    <PersonItem v-for="person in peopleList" :key="person.id" :person="person" />
  </div>
</template>

<script>
import PersonItem from '@/components/people/PersonItem.vue';

export default {
  components: {
    PersonItem
  },
  data() {
    return {
      peopleList: this.$store.getters['people/getEmployeesList']
    }
  },

  methods: {
    async loadUsersList() {
      this.$store.dispatch('people/loadEmployeesList');
    },
  },

  mounted() {
    this.loadUsersList();

  }

}
</script>

<style lang="scss" scoped>
.userslist {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px 15px;

    @media (min-width: $sm) {
      grid-template-columns: repeat(2, calc(50% - 15px));
    }

    @media (min-width: $md) {
      grid-template-columns: repeat(3, calc(33% - 15px));
    }

    @media (min-width: $tablet) {
      grid-template-columns: repeat(4, calc(25% - 15px));
    }
  }
}
</style>