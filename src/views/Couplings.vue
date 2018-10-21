<template>
    <div>
        <h1>
            Összevonások({{ couplingsCount }})
        </h1>
        <input
            type=text
            v-model="searchText"/>
        <coupling-list :removable="true" :couplings="filteredCouplings" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CouplingList from '@/components/CouplingList';

export default {
    computed: {
        ...mapGetters([
            'filteredCouplings',
            'couplingsCount'
        ]),
        searchText: {
            get() {
                return this.$store.state.couplings.filter;
            },
            set(filter) {
                this.$store.commit('setFilter', {
                    categorization: 'couplings',
                    filter
                });
            }
        }
    },
    components: {
        CouplingList
    },
}
</script>

<style lang="scss" scoped>
    
</style>
