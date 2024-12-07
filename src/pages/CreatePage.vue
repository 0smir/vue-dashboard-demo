<template>
  <div class="container">
    <div class="create__link-wrapper">
      <RouterLink class="link create__link link-btn" to="/board/new">
        <SvgIcon name="add" class="icon icon--add" />
        <span class="create__link-text">Create Board</span>
      </RouterLink>
      <RouterLink class="link create__link link-btn" to="/tasks/new">
        <SvgIcon name="add" class="icon icon--add" />
        <span class="create__link-text">Create Task</span>
      </RouterLink>
      <RouterLink class="link create__link link-btn" to="/people/registration">
        <SvgIcon name="add" class="icon icon--add" />
        <span class="create__link-text">Add Person</span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.create {
  &__link-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 50px auto;
    gap: 30px 15px;
    justify-content: space-between;
  }

  &__link {

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: max(50rem, calc(50% - 15px));
    aspect-ratio: 1;
    border: 4px solid var(--color-primary);
    border-radius: var(--border-radius-large);
    color: var(--color-primary-medium);
    font-size: 18px;
    font-weight: 700;
    transition: all .35s ease;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      border: 4px solid var(--color-primary);
      color: var(--color-primary);
      transform: scale(1.02);
      transition: all .35s ease;
    }

    @media (min-width: $sm) {
      margin: 0;
      width: max(min(25rem, calc(50% - 15px)), calc(50% - 15px));
    }

    @media (min-width: $md) {
      width: min(25rem, calc(33% - 15px));
    }
  }

  &__link-text {
    margin-bottom: 10px;
    position: absolute;
    bottom: 10px;
  }
}

.icon--add {
  position: absolute;
  top: 50%;
  width: 50%;
  height: 50%;
  transform: translateY(-50%);
}
</style>