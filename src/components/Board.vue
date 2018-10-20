<template>
    <div class="flex">
        <product-list
            title="Surplus"
            :products="surplus"
            class="width-50" />
        <product-list
            title="Shortage"
            :products="shortage"
            class="width-50" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductList from '@/components/ProductList';

export default {
    computed: {
        ...mapState([
            'surplus',
            'shortage',
        ])
    },
    components: {
        ProductList
    },
}
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        flex-direction: row;
    }

    .width-50 {
        width: 50%;
    }
</style>

