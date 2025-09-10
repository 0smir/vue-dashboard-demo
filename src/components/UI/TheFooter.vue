<template>
    <footer>
        <div class="container">
            <h2>Footer</h2>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    min-height: 75px;
    background-color: $color-primary;
    color: $color-white;
    
    @media print {
        display: none;
    }
}
</style>