<template>
    <div>
        <h1>
            Összevonások({{ couplings.length }})
        </h1>
        <input
            type=text
            v-model="searchText"/>
        <coupling-list :removable="true" :couplings="filteredCouplings" :filter="searchText" />
    </div>
</template>

<script>
import { hasProducts } from '@/util/productsController';
import { mapState } from 'vuex';
import CouplingList from '@/components/CouplingList';

export default {
    data() {
        return {
            searchText: '',
        }
    },
    computed: {
        ...mapState([
            'couplings'
        ]),
        filteredCouplings() {
            // TODO: Try to simplify this with Categorization.vue
            const searchText = this.searchText.toLowerCase();
            return this.couplings.filter((coupling) => {
                return hasProducts(coupling.surplus, searchText)
                  || hasProducts(coupling.shortage, searchText);
            });
        },
    },
    components: {
        CouplingList
    },
}
</script>

<style lang="scss" scoped>
    
</style>
