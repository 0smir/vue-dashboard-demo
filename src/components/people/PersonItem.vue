<template>
  <div class="person">
    <div class="person__actions-wrapper">
      <BaseButton class="btn  btn--small person__btn-actions" aria-label="press to get additional functions">
        <SvgIcon name="ellipsis" class="icon" />
      </BaseButton>
      <div class="person__actions-dropdown">
        <BaseButton class="btn btn__default btn--medium person__btn-delete" aria-label="Press to remove person">
          <SvgIcon name="delete" class="icon" />
          Remove
        </BaseButton>
        <BaseButton class="btn btn__default btn--medium person__btn-edit" aria-label="Press to edit person">
          <SvgIcon name="edit" class="icon" />
          Edit
        </BaseButton>
      </div>
    </div>
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
    console.log(this.person.name);
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

  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0;
  background-color: var(--colorItemBg);
  border: 2px solid var(--colorItemBorder);
  border-radius: 12px;
  transition: all .35s ease;

  &:hover {
    border-color: var(--colorItemBorderHovered);
    transition: all .35s ease;

    .person__image-wrapper {
      border-color: var(--colorItemBorderHovered);
    }
  }

  &__actions-wrapper {
    position: relative;
    align-self: flex-end;
    text-align: right;

    &:hover {
      .person__actions-dropdown {
        display: block;
      }

      .person__btn-actions {
        background-color: var(--colorItemLinkBg);
        color: var(--colorItemLinkText);
      }
    }
  }

  &__btn-actions {
    margin: 3px 10px 5px 0;
    border: none;
    background-color: var(--colorItemBg);
    color: var(--colorItemText);

    &:hover {
      background-color: var(--colorItemLinkBg);
      color: var(--colorItemLinkText);
    }
  }

  &__actions-dropdown {
    display: none;
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 10;
    max-width: 150px;
    padding: 10px 5px;
    border-radius: 4px;
    background-color: var(--colorItemLinkBg);
    border: 1px solid var(--colorItemBorder);
  }

  &__btn-delete {
    margin-bottom: 10px;
  }

  &__btn-edit,
  &__btn-delete {
    width: 100%;

    .icon {
      margin-right: 5px;
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
    transition: all .35s ease;

    &:hover {
      background-color: var(--colorItemLinkHoveredBg);
      color: var(--colorItemLinkTextHovered);
      transition: all .35s ease;
    }
  }
}
</style>