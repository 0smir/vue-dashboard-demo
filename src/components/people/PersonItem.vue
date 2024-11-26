<template>
  <div class="person">
    <div class="person__image-wrapper rounded">
      <SvgIcon v-if="!person.img" name="person" class="icon person__svg" />
      <img v-else src="" alt="" class="person__img">
    </div>
    <h3 class="person__name">{{ fullName }}</h3>
    <span class="person__position">{{ person.position }}</span>
    <router-link class="link person__link" :to="profileLink">View Prifile</router-link>
  </div>
</template>

<script>
export default {
  props: ['person'],

  computed: {
    fullName() {
      return this.person.name + ' ' + this.person.lastName;
    },
    profileLink() {
      return '/people/' + this.person.id;
    }
  },
  created() {
    console.log(this.person);

  }

}
</script>

<style lang="scss" scoped>
.person {
  --colorItemBg: var(--color-white);
  --colorItemText: var(--color-secondary);
  --colorItemBorder: var(--color-secondary-light);
  --colorItemBorderHovered: var(--color-primary);
  --colorItemRadius: var(--border-radius-large);

  --colorPositionText: var(--color-primary-medium);

  --colorItemLinkBg: var(--color-primary-light);
  --colorItemLinkHoveredBg: var(--color-primary);
  --colorItemLinkText: var(--color-primary);
  --colorItemLinkTextHovered: var(--color-white);

  --colorItemImgBorder: var(--color-secondary-light);

  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 15px 0 0;
  background-color: var(--colorItemBg);
  border: 2px solid var(--colorItemBorder);
  border-radius: 12px;

  &:hover {
    border-color: var(--colorItemBorderHovered);

    .person__image-wrapper {
      border-color: var(--colorItemBorderHovered);
    }
  }

  &__image-wrapper {
    position: relative;
    overflow: hidden;
    margin: 0 auto 20px;
    width: 50%;
    padding-top: 47%;
    border: 3px solid var(--colorItemImgBorder);
    color: var(--colorItemImgBorder);
  }

  &__svg {
    position: absolute;
    inset: 10% 0 0 0;
    object-fit: contain;
    height: 100%;
    width: 100%;
  }

  &__name {
    font-size: 20px;
  }

  &__position {
    font-size: 12px;
    color: var(--colorPositionText);
    margin-bottom: 15px;
  }

  &__link {
    padding: 15px;
    background-color: var(--colorItemLinkBg);
    color: var(--colorItemLinkText);
    border-bottom-left-radius: var(--colorItemRadius);
    border-bottom-right-radius: var(--colorItemRadius);
    text-decoration: none;

    &:hover {
      background-color: var(--colorItemLinkHoveredBg);
      color: var(--colorItemLinkTextHovered);
    }
  }
}
</style>