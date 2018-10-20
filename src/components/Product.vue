<template>
    <p class="item hover-highlight" :class="{'selected': isSelected}" @click="toggleSelected">
        {{ product.id }} | {{ product.label }} | {{ product.count }}
    </p>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            isSelected: false,
        }
    },
    methods: {
        toggleSelected() {
            this.isSelected = !this.isSelected;
        }
    },
}
</script>

<style lang="scss" scoped>
    .item {
        position: relative;
    }

    .hover-highlight:hover::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .selected {
        background-color: rgba(0, 174, 255, 0.61);
    }
</style>
