<template>
    <div>
        <h2 class="title">{{ title }}({{ categorization.length }})</h2>
        <input type="checkbox" v-model="persistSearch">
        <input
            v-if="isSearchable"
            type=text
            v-model="searchText"/>
        <product-list :products="filteredProducts" :itemSelectionHandler="itemSelectionHandler"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { searchProducts } from '@/util/productsController';
import ProductList from '@/components/ProductList.vue'

export default {
    data() {
        return {
            // TODO: Consider using a mixin (with Store)
            persistSearch: false,
            searchText: '',
        }
    },
    props: ['title', 'isSearchable', 'categorization', 'itemSelectionHandler', 'preFilter'],
    computed: {
        filteredProducts() {
            return searchProducts(this.categorization, `${this.preFilter} ${this.searchText}`)
        },
        ...mapGetters([
            'isEditedCouplingEmpty'
        ]),
    },
    watch: {
        isEditedCouplingEmpty(changedTo) {
            if (!this.persistSearch && changedTo) {
                this.searchText = '';
            }
        }
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
