<template>
    <ul>
        <li v-for="(coupling, index) in couplings" :key="index">
            <coupling :removable="removable" :coupling="coupling" />
        </li>
    </ul>
</template>

<script>
import Coupling from '@/components/Coupling';

export default {
    props: ['couplings', 'filter', 'removable'],
    components: {
        Coupling
    },
}
</script>

<style>

</style>
