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
                :preFilter="searchText"
                :isSearchable="true"
                :categorization="surplus"
                itemSelectionHandler="selectSurplus"
                class="half-pane" />
            <categorization
                title="Hiány"
                :preFilter="searchText"
                :isSearchable="true"
                :categorization="shortage"
                itemSelectionHandler="selectShortage"
                class="half-pane" />
        </div>
        <div class="flex">
            <button>Összes hozzáadása</button>
            <button>Összes hozzáadása</button>
        </div>
        <coupling :coupling="editedCoupling" />
        <button @click="addCoupling" :disabled="isEditedCouplingEmpty">Összevon</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Categorization from '@/components/Categorization';
import Coupling from '@/components/Coupling';

export default {
    data() {
        return {
            persistSearch: false,
            searchText: '',
        }
    },
    computed: {
        ...mapState([
            'surplus',
            'shortage',
            'editedCoupling',
        ]),
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
        Categorization,
        Coupling
    },
    methods: {
        ...mapMutations(['addCoupling']),
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

