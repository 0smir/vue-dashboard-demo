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
  props: ['peopleList'],
  components: {
    PersonItem
  }

}
</script>

<style lang="scss" scoped>
.userslist {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    column-gap: 15px;
  }
}
</style>