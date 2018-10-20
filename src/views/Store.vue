<template>
    <div>
        <h1>
            Leltár
        </h1>
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
            <categorization
                title="Kiválasztott"
                :isSearchable="false"
                :categorization="selectedSurplus"
                itemSelectionHandler="selectSurplus"
                class="half-pane" />
            <categorization
                title="Kiválasztott"
                :isSearchable="false"
                :categorization="selectedShortage"
                itemSelectionHandler="selectShortage"
                class="half-pane" />
        </div>
        <coupling :coupling="{
            surplus: selectedSurplus,
            shortage: selectedShortage,
        }" />
        <button @click="couple">Összevon</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Categorization from '@/components/Categorization';
import Coupling from '@/components/Coupling';

export default {
    data() {
        return {
            searchText: '',
        }
    },
    computed: {
        ...mapState([
            'surplus',
            'shortage',
            'selectedSurplus',
            'selectedShortage'
        ]),
    },
    components: {
        Categorization,
        Coupling
    },
    methods: {
        couple() {
            this.$store.dispatch('couple');
        }
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

