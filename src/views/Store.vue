<template>
    <div>
        <h1>
            Leltár
        </h1>
        <input type="checkbox" v-model="persistSearch">
        <input type="text" v-model="searchText">
        <div class="flex">
            <categorization
                title="Többlet"
                categorization="surplus"
                class="half-pane" />
            <categorization
                title="Hiány"
                categorization="shortage"
                class="half-pane" />
        </div>
        <div class="flex">
            <button @click="() => addFilteredProducts('surplus')">Összes hozzáadása</button>
            <button @click="() => addFilteredProducts('shortage')">Összes hozzáadása</button>
        </div>
        <coupling :coupling="coupling" />
        <button @click="addCoupling" :disabled="!isProductSelected">Összevon</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import Categorization from '@/components/Categorization';
import Coupling from '@/components/Coupling';

export default {
    data() {
        return {
            persistSearch: false,
        };
    },
    computed: {
        ...mapState(['preFilter']),
        ...mapGetters([
            'selectedProducts',
            'isProductSelected'
        ]),
        coupling() {
            return {
                surplusProducts: this.selectedProducts('surplus'),
                shortageProducts: this.selectedProducts('shortage')
            };
        },
        searchText: {
            get() {
                return this.preFilter;
            },
            set(filter) {
                this.$store.commit('setPreFilter', { filter });
            }
        }
    },
    watch: {
        isProductSelected(changedTo) {
            if (!this.persistSearch && changedTo) {
                this.searchText = '';
            }
        }
    },
    components: {
        Categorization,
        Coupling
    },
    methods: {
        ...mapGetters([
            'filteredSurplus',
            'filteredShortage'
        ]),
        ...mapMutations([
            'addCoupling',
        ]),
        ...mapActions([
            'addFilteredProducts',
        ]),
    }
}
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    .half-pane {
        width: 45%;
    }
</style>

