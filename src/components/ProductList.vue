<template>
    <div>
        <ul>
            <li v-for="(product, productLabel) in products" :key="productLabel">
                <product :product="product"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
    props: ['products'],
    components: {
        Product,
    }
}
</script>

<style>

</style>
