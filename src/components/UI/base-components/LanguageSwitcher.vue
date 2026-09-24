<template>
  <div class="language-switcher">
    <BaseButton class="btn btn__default btn--medium">{{
      $t("common.header.lang_switcher")
    }}</BaseButton>
    <ul class="language-switcher__nav nav-dropdown">
      <li
        class="language-switcher__nav-item active"
        @click="changeLanguage('en')"
      >
        EN
      </li>
      <li class="language-switcher__nav-item" @click="changeLanguage('ua')">
        UA
      </li>
      <li class="language-switcher__nav-item" @click="changeLanguage('ru')">
        RU
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  padding-bottom: 5px;
  margin-right: 15px;

  &:hover,
  &:focus,
  &:active {
    .language-switcher__nav {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }

  &__nav {
    z-index: 999;
    position: absolute;
    top: calc(100% - 3px);
    display: none;
    padding: 5px;
    width: 100%;
    list-style: none;
    border: 1px solid $color-secondary-light;
    border-radius: $border-radius-medium;
    background: $color-white;
    font-weight: 500;
    text-align: center;
  }
  &__nav-item {
    position: relative;
    color: $color-tetriary;
    padding: 10px;
    border-radius: $border-radius-medium;

    &:hover {
      background-color: $color-primary-light;
      color: $color-primary;

      &::before {
        position: absolute;
        left: 15px;
        content: "➤";
      }
    }

    &.active {
      background-color: $color-primary-light;
      color: $color-primary;

      &::before {
        position: absolute;
        left: 15px;
        content: "➤";
      }
    }
  }
}
</style>
