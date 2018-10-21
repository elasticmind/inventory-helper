<template>
    <div>
        <ul>
            <li v-for="product in products" :key="product.label">
                <product :product="product" :clickHandler="productClickHandler" />
            </li>
        </ul>
    </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
    props: ['products', 'productClickHandler'],
    components: {
        Product,
    }
}
</script>

<style>

</style>
