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
    background-color: var(--color-primary);
    color: #fff;
    
    @media print {
        display: none;
    }
}
</style>