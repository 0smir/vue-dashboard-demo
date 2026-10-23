<template>
  <div class="container breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item"> 
        <router-link to="/" class="breadcrumbs__item-link">
          {{ $t('common.header.navigation.home_link') }}
        </router-link>
      </li>
      <li v-if="breadcrumbsWithLinks.length" class="breadcrumbs__item" v-for="(breadcrumb, index) in breadcrumbsWithLinks" :key="index">
        <i>/</i> <router-link :to="breadcrumb.to" class="breadcrumbs__item-link">{{ getLocalizedLabel(breadcrumb.label) }}</router-link>
      </li>
      <li class="breadcrumbs__item current-breadcrumb"> <i>/</i> {{ getLocalizedLabel(lastBreadcrumbsItem.label) }}</li>
    </ul>
  </div>
 
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const route = this.$route;
      const matchedRoutes = route.matched.filter((routeItem) => routeItem.meta.breadcrumb);
      
      return matchedRoutes.map((routeItem) => {
        const breadcrumb = routeItem.meta.breadcrumb;
        const label =
          typeof breadcrumb.label === "function"
            ? breadcrumb.label(route)
            : breadcrumb.label || routeItem.name;
        return {
          label,
          to: this.getRoutePath(route, routeItem),
        }
      }
    );
    },

    lastBreadcrumbsItem(){
      return this.breadcrumbs[this.breadcrumbs.length - 1] || { label: ""};
    },

    breadcrumbsWithLinks(){
      return this.breadcrumbs.slice(0, -1);
    }
  },
  methods: {
    getRoutePath(route, routeItem) {
      const matchedSegments = route.matched.slice(0, route.matched.indexOf(routeItem) + 1);
      return matchedSegments.map((segment) => segment.path).join('/');
    },
    getLocalizedLabel(label) {
      if (!label) return "";
      return this.$t(label);
    },
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-top: 20px;

  &__list {
    display: flex;
  }

  &__item{
    font-size: 16px;
    font-weight: 400;
  }

  &__item-link {
    color: $color-tetriary;

    &:hover,
    &:focus {
      color: $color-primary;
      text-decoration: underline;
    }
  }
}

.current-breadcrumb {
  color: $color-text-dark;
}

</style>