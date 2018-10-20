<template>
    <div>
        <ul>
            <li v-for="product in products" :key="product.label">
                <product :product="product" :itemSelectionHandler="itemSelectionHandler"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
    props: ['products', 'itemSelectionHandler'],
    components: {
        Product,
    }
}
</script>

<style>

</style>
