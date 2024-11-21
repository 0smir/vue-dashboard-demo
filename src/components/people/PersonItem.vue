<template>
  <div>
    {{ person.name }}
  </div>
</template>

<script>
export default {
  props: ['person'],
  created() {
    console.log(this.person);

  }

}
</script>

<style lang="scss" scoped></style>