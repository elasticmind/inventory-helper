<template>
    <div>
        <h1>
            Leltár
        </h1>
        <label for="searchLock">
            Search Lock
            <input type="checkbox" id="searchLock" @input="toggleSearchLock">
        </label>
        <div class="flex">
            <categorization
                title="Többlet"
                :isSearchable="true"
                :categorization="surplus"
                itemSelectionHandler="selectSurplus"
                class="half-pane" />
            <categorization
                title="Hiány"
                :isSearchable="true"
                :isSearchLocked="isSearchLocked"
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
    computed: {
        ...mapState([
            'surplus',
            'shortage',
            'selectedSurplus',
            'selectedShortage'
        ]),
        isSearchLocked() {
            return this.$store.state.commonSearchTerm != null;
        }
    },
    components: {
        Categorization,
        Coupling
    },
    methods: {
        toggleSearchLock(event) {
            this.$store.commit('toggleSearchLock');
        },
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

