<template>
    <header>
        <div class="container header-content">
            <router-link to="/" class="header-logo">BoardGo</router-link>
            <nav>
                <ul class="header-nav">
                    <li class="header-nav__item"><router-link to="/">Home</router-link></li>
                    <li class="header-nav__item"><router-link to="/">About</router-link></li>
                    <li class="header-nav__item"><router-link to="/">Projects</router-link></li>
                </ul>
            </nav>

            <div class="search-form-wrapper">
                <form><input type="search"> <button>search</button></form>
            </div>
        </div>

    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
header {
    padding: 15px 0;
    width: 100%;
    background-color: var(--color-primary);

}

.header-logo {
    font-weight: 700;
}

.header-nav {
    display: none;
    list-style: none;

    @media (min-width: 769px) {
        display: flex;
    }

    &__item {
        margin-right: 10px;
    }
}

.search-form-wrapper {
    display: none;

    @media (min-width: 769px) {
        display: block;
    }
}

.header-content {
    display: flex;
    justify-content: space-between;
}
</style>