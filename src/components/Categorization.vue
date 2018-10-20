<template>
    <div>
        <h2 class="title">{{ title }}</h2>
        <input
            v-if="isSearchable"
            type=text
            v-model="searchText"/>
        <product-list :products="filteredProducts" :itemSelectionHandler="itemSelectionHandler"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductList from '@/components/ProductList.vue'

export default {
    data() {
        return {
            searchText: '',
        }
    },
    props: {
        title: {},
        isSearchable: {},
        categorization: {},
        itemSelectionHandler: {},
        preFilter: {
            default: '',
        }
    },
    computed: {
        filteredProducts() {
            const preFilter = this.preFilter.toLowerCase();
            const searchText = this.searchText.toLowerCase();
            return this.categorization.filter((product) => {
                const label = product.label.toLowerCase();
                return label.includes(preFilter) && label.includes(searchText);
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
