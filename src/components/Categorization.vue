<template>
    <div>
        <h2 class="title">{{ title }}</h2>
        <input v-if="isSearchable" :disabled="isSearchLocked" type=text v-model="searchText"/>
        <product-list :products="filteredProducts" :itemSelectionHandler="itemSelectionHandler"/>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'

export default {
    data() {
        return {
            searchText: '',
        }
    },
    props: ['isSearchable', 'isSearchLocked', 'title', 'categorization', 'itemSelectionHandler'],
    computed: {
        filteredProducts() {
            const searchFor = this.searchText.toLowerCase();
            return this.categorization.filter((product) => {
                const label = product.label.toLowerCase();
                return label.includes(searchFor);
            });
        },
    },
    components: {
        ProductList,
    }
}
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
    }
</style>
