<template>
    <ul>
        <li v-for="(coupling, index) in couplings" :key="index">
            <coupling :coupling="coupling" />
        </li>
    </ul>
</template>

<script>
import Coupling from '@/components/Coupling';

export default {
    props: ['couplings'],
    components: {
        Coupling
    },
}
</script>

<style>

</style>
