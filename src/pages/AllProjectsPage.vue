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
          <ProjectsListComponent v-for="(project, index) in filteredProjects" 
                                  :key="project.id" 
                                  :project="project"
                                  :isActive="index === activeProjIndex"
                                  @change-active-project="updateActiveProject"
          />
        </ul>
        <div class="projects__project-content">
          <ProjectInfoComponent :project="filteredProjects[activeProjIndex]"></ProjectInfoComponent>
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
      activeProjIndex: 0,
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
      let activeIndex = this.filteredProjects.indexOf(project);
      this.activeProjIndex = activeIndex;
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
  padding-top: 20px;
  display: flex;
  justify-content: stretch;
  min-height: 70vh;
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
    // border: 3px solid var(--color-primary);
    border-left: 3px solid var(--color-primary);
    @media(min-width: $md) {
      width: 70%;
      padding: 0 15px;
    }
  }
}

</style>