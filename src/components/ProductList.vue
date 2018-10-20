<template>
    <div>
        <h2>
            {{ title }}
        </h2>
        <ul>
            <li v-for="(product, index) in products" :key="index">
                <product :data="product"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
    props: ['title', 'products'],
    components: {
        Product,
    }
}
</script>

<style>

</style>
