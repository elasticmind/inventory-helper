<template>
    <div class="flex">
        <categorization
            title="Surplus"
            :categorization="surplus"
            class="width-50" />
        <categorization
            title="Shortage"
            :categorization="shortage"
            class="width-50" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Categorization from '@/components/Categorization';

export default {
    computed: {
        ...mapState([
            'surplus',
            'shortage',
        ])
    },
    components: {
        Categorization
    },
}
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        flex-direction: row;
    }

    .width-50 {
        width: 50%;
    }
</style>

