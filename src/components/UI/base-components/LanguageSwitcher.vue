<template>
  <div :class="['language-switcher', 'language-switcher--' + placement]">
    <BaseButton class="btn btn__outlined btn--small language-switcher__btn">
      <span class="language-switcher__btn-text">{{ currentLangLabel }}</span>
      <SvgIcon name="chevron-down" class="icon icon--medium" />
    </BaseButton>
    <ul class="language-switcher__nav nav-dropdown">
      <li
        v-for="lang of languagesList"
        :key="lang.code"
        :class="['language-switcher__nav-item', { active: currentLang == lang.code }]"
        @click="changeLanguage(lang.code)"
      >
        {{ lang.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["placement"],
  data() {
    return {
      languagesList: [
        { code: "en", label: "EN" },
        { code: "ua", label: "UA" },
        { code: "ru", label: "RU" },
      ],
      currentLang:  localStorage.getItem("lang") || this.$i18n.locale,
    
    };
  },
  computed: {
    currentLangLabel() {
     return this.languagesList.find(item => item.code === this.currentLang).label;
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = this.currentLang = lang;
      localStorage.setItem("lang", lang);
      document.querySelector("html").setAttribute("lang", lang);
    },

    toggleLangDropdown() {
      
    }
  },
};
</script>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  padding-block: 5px;
  margin-right: 15px;
  width: 85px;

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

    &:hover,
    &.active {
      background-color: $color-primary-light;
      color: $color-primary;

      &::before {
        position: absolute;
        left: 8px;
        content: "➤";
      }
    }
  }

  &__btn {
    background-color: rgba($color-white, 0.15);
    color: $color-white;
    width: 100%;
  }

  &__btn-text {
    margin-right: 5px;
  }
}
</style>
