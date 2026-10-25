<template>
  <div class="container">
    <div class="page__header flex">
       <h2 class="title">{{ $t("pages.people.all_people") }}</h2>
    </div>
    
    <EmployeesFilter :filterItemsList="filterItemsList" :activeItem="activeFilter" @on-filter-change="filterNameChange" />
    
    <div class="people__content-wrapper">
        <div v-if="!peopleList">
          <p>{{ $t("pages.people.user_list_empty") }}</p>
        </div>
        <div v-else class="userslist__wrapper">
          <PersonItem v-for="person in peopleList" :key="person.id" :person="person" />
        </div>
    </div>
  </div>
</template>

<script>
import EmployeesFilter from '@/components/people/PeopleFilter.vue';
import PersonItem from "@/components/people/PersonItem.vue";

export default {
  components: {
    EmployeesFilter,
    PersonItem,
  },

  data() {
    return {
      isLoading: false,
      activeFilter: 'all',
      error: null
    }
  },
  computed: {
   filterItemsList() {
      return this.$store.getters['people/getPositionsList'];
    },
    peopleList() {
      return this.$store.getters["people/getEmployeesList"].filter((item) => {
        console.log(item);
        
        if (this.activeFilter === 'all') {
          return item;
        } else {
          return item.position === this.activeFilter;
        }
      });
    }
  },
  methods: {
    async loadUsersList() {
      try {
        await this.$store.dispatch("people/loadEmployeesList");
      } catch (error) {
        this.error = error.message || "Smth went wrong!";
      }
    },

    filterNameChange(name) {    
      this.activeFilter = name;
    }
  },
  created() {
    this.loadUsersList();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}

.userslist {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px 15px;

    @media (min-width: $sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $tablet) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
