<template>
    <div
        class="item hover-highlight"
        :class="{'selected': isSelected}"
        @click="toggleSelected"
        :title="tooltip">
        <div class="product-label">{{ product.label }}</div>
        <div class="product-count">{{ product.count }}</div>
    </div>
</template>

<script>
export default {
    props: ['product', 'itemSelectionHandler'],
    data() {
        return {
            isSelected: false,
        }
    },
    computed: {
        tooltip() {
            const joinedPath = this.product.path.join('\\');
            return (
`Termék azonosító: ${this.product.id}
Kategória azonosító: ${this.product.categoryId}
Kategória: ${joinedPath}`
            );
        }
    },
    methods: {
        toggleSelected() {
            this.isSelected = !this.isSelected;
            if (this.itemSelectionHandler) {
                this.$store.commit(this.itemSelectionHandler, this.product);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
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

    .product-label {
        
    }

    .product-count {
        margin-left: auto;
    }
</style>
