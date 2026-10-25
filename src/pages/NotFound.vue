<template>
  <div class="container not-found">
    <p class="not-found__error-name">{{ $t("pages.not_found.error_name") }}</p>
    <h1 class="not-found__title">404</h1>
    <h3 class="not-found__sub-title"> {{ $t("pages.not_found.subtitle") }}</h3>
    <p class="not-found__description_text">
      {{ $t("pages.not_found.description_text") }}
    </p>
    <div class="not-found__btn-wrapper">
      <router-link href="/" 
      class="link btn__link btn__default btn--medium not-found__btn"
              :title="$t('common.header.navigation.home_link')"
              :aria-label=" $t('common.link_label', { linkName: $t('common.header.navigation.home_link') })"
      >
      <SvgIcon name="home" class="icon icon--medium" />
        {{ $t("common.back_home") }}
      </router-link>
      <router-link :href="prevPageUrl" 
                    class="link btn__link btn__outlined btn--medium not-found__btn"
      > 
        <SvgIcon name="arrow" class="icon icon--medium" />
        {{ $t("common.back_to_prev_link") }}
      </router-link>
    </div>

  </div>
</template>

<script>
export default {

  computed: {
    prevPageUrl() {
      return "/";
    }
  }

}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 24px;
  max-width: 560px;

  &__error-name {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2px;
    color: $color-text-acсent;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    font-size: 200px;
    line-height: 0.9;
    font-weight: 300;
    letter-spacing: -6px;
    background: $main-gradient;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__sub-title {
    margin: 0;
    font-size: 44px;
    line-height: 1.15;
    font-weight: 400;
    color: $color-tetriary;
  }

  &__description_text {
    margin: 0;
    font-size: 17px;
    line-height: 1.6;
    color: $color-tetriary;
  }

  &__btn-wrapper {
    display: flex;
    gap: 16px;
  }

  &__btn {
    gap: 5px;
  }
}
</style>