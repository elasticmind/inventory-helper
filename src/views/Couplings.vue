<template>
    <div>
        <h1>
            Összevonások
        </h1>
        <coupling-list :couplings="couplings" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CouplingList from '@/components/CouplingList';

export default {
    computed: {
        ...mapState([
            'couplings'
        ]),
    },
    components: {
        CouplingList
    },
}
</script>

<style lang="scss" scoped>
    
</style>

