<template>
    <div class="wrapper">
        <button v-if="removable" @click="removeCoupling(coupling)">Törlés</button>
        <div class="item">
            <h2>
                Többlet
            </h2>
            <product-list
                :products="coupling.surplusProducts"
                :productClickHandler="toggleProductSelection('surplus')"/>
        </div>
        <div class="item">
            <h2>
                Hiány
            </h2>
            <product-list
                :products="coupling.shortageProducts"
                :productClickHandler="toggleProductSelection('shortage')"/>
        </div>
        <hr>
        <div class="result">
            <h2>
                Eredmény
            </h2>
            {{ result }}
        </div>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList';
import { mapMutations } from 'vuex';

function sumProducts(products) {
  return products.reduce((sum, product) => sum + product.count, 0);
}

export default {
    props: ['coupling', 'removable'],
    components: {
        ProductList,
    },
    computed: {
        result() {
            return sumProducts(this.coupling.surplusProducts) + sumProducts(this.coupling.shortageProducts);
        }
    },
    methods: {
        ...mapMutations([
            'removeCoupling'
        ]),
        toggleProductSelection(categorization) {
            return function(product) {
                this.$store.commit('toggleProductSelection', { categorization, product });
            }
        }
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

