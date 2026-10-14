<template>
    <footer class="footer">
        <div class="container footer__container">
            <p class="footer__description" v-html="$t('common.footer.rights_text', {year: currentYear})"></p>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        currentYear() {
            let currentDate = new Date();
            return currentDate.getFullYear();
        }
    }
}
</script>

<style lang="scss">
.footer {
    display: flex;
    width: 100%;
    color: $color-tetriary;
    border-top: 2px solid $color-secondary-light;
    @media print {
        display: none;
    }

    &__container {
        width: 100%;
    }

    &__description {
        display: flex;
        justify-content: center;
    }

    &__rights-text {
        margin-left: 3px;
    }
}
</style>