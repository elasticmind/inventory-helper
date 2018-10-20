<template>
    <div>
        <!-- <p class="category-id">
            {{ category.id }}
        </p>
        <p class="category-path">
            {{ category.path | prettyPath }}
        </p> -->
        <product-list :products="category.products" />
    </div>
</template>

<script>
import ProductList from '@/components/ProductList';

export default {
    props: ['category'],
    components: {
        ProductList,
    },
    filters: {
        prettyPath(path) {
            return path.join('\\');
        }
    }
}
</script>

<style lang="scss" scoped>
    .category-id {
        font-weight: bold;
    }

    .category-path {
        color: #aaa;
    }
</style>

