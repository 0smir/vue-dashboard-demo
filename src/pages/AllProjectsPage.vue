<template>
  <div class="container">
    <h2 class="title">All Prijects List</h2>
    <ProjectsFilterComponent @search-updated="handleSearch"/>
    <div class="projects-page__content">
      <p v-if="!filteredProjects.length">
        We couldn’t find any project with the name ‘<i>{{ searchString }}</i>’. Please refine your search.
      </p>
      <div v-else class="projects__info">
        <ul class="projects__list">
          <ProjectsListComponent v-for="project in filteredProjects" 
                                  :key="project.id" 
                                  :project="project"
                                  @change-active-project="updateActiveProject"
          />
        </ul>
        <div class="projects__project-content">
          <ProjectInfoComponent :project="filteredProjects[0]"></ProjectInfoComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectsFilterComponent from '@/components/project/ProjectsFilterComponent.vue';
import ProjectsListComponent from '@/components/project/ProjectsListComponent.vue';
import ProjectInfoComponent from '@/components/project/ProjectInfoComponent.vue';

export default {
  components: {
    ProjectsFilterComponent,
    ProjectsListComponent,
    ProjectInfoComponent
  },
  data() {
    return {
      searchString: '',
      error: null
    }
  },
  computed: {
    projectsList() {
      return this.$store.getters['projects/getProjects'];
    },
    filteredProjects() {
      if (!this.searchString) return this.projectsList;

      return this.projectsList.filter(project =>
        project.title.toLowerCase().includes(this.searchString.toLowerCase())
      );
    }
  },

  methods: {
    async loadProjectsList() {
      try {
        this.$store.dispatch('projects/loadProjectsList');
      } catch (error) {
        this.error = error.message || "failed to fetch";
      }
    },
    handleSearch(searchValue) {
      this.searchString = searchValue;
    },
    updateActiveProject(project) {
      console.log("updateActiveProject", project);
      
    }
  },
  created() {
    this.loadProjectsList();
  }
    
}
</script>

<style lang="scss" scoped>
.search-string{
  margin-bottom: 20px;
}
.projects-page__content{
  border: 1px solid red;
  height: 400px;
}
.projects{
  &__info {
    display: flex;
    flex-direction: column;

    @media(min-width: $md) {
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;
    }
  }
  &__list {
    @media(min-width: $md) {
      width: 30%;
    }
  }
  &__project-content {
    border: 1px solid var(--color-primary);
    @media(min-width: $md) {
      width: 70%;
    }
  }
}

</style>