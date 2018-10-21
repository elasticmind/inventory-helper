<template>
    <div
        class="item hover-highlight"
        :title="tooltip"
        @click="clickHandler(product)" >
        <div class="product-label">{{ product.label }}</div>
        <div class="product-count">{{ product.count }}</div>
    </div>
</template>

<script>
export default {
    props: ['product', 'clickHandler'],
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

    .product-count {
        margin-left: auto;
    }
</style>
