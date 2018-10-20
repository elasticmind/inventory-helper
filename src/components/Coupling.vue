<template>
    <div class="wrapper">
        <div class="item">
            <h2>
                Többlet
            </h2>
            <product-list :products="coupling.surplus" />
        </div>
        <div class="item">
            <h2>
                Hiány
            </h2>
            <product-list :products="coupling.shortage" />
        </div>
        <hr>
        <div class="result">
            <h2>
                Eredmény
            </h2>
            {{ coupling.result }}
        </div>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList';

export default {
    props: ['coupling'],
    components: {
        ProductList,
    },
}
</script>

<style lang="scss" scoped>
    .wrapper {
        border: 1px solid black;
    }

    .item {
        background-color: yellow;
    }
</style>

