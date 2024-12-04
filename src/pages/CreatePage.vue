<template>
  <div class="container">
    <div class="create__link-wrapper">
      <RouterLink class="link link-btn" to="/board/new">
        <SvgIcon name="add" class="icon icon--add" />
        <span class="create__link-text">Create Board</span>
      </RouterLink>
      <RouterLink class="link link-btn" to="/tasks/new">
        <SvgIcon name="add" class="icon icon--add" />
        <span class="create__link-text">Create Task</span>
      </RouterLink>
      <RouterLink class="link link-btn" to="/person/new">
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
.create__link-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 50px auto;
  gap: 40px 30px;
  justify-content: space-between;
}

.link-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  padding-top: 90%;
  border: 4px solid var(--color-primary);
  border-radius: var(--border-radius-large);
  color: var(--color-primary-medium);
  font-size: 18px;
  font-weight: 700;
  transition: all .35s ease;
  text-decoration: none;
  text-transform: uppercase;

  @media (min-width: $sm) {
    padding-top: 50%;
  }

  @media (min-width: $md) {
    padding-top: 30%;
  }

  @media (min-width: $tablet) {
    padding-top: 25%;
  }

  &:hover {
    border: 4px solid var(--color-primary);
    color: var(--color-primary);
    transform: scale(1.02);
    transition: all .35s ease;
  }

  .icon--add {
    position: absolute;
    top: 50%;
    width: 15rem;
    height: 15rem;
    transform: translateY(-50%);
  }

  .create__link-text {
    margin-bottom: 10px;
    // position: absolute;
    // bottom: 10px;
  }
}
</style>