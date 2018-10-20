<template>
    <div>
        <ul>
            <li v-for="(category, categoryId) in categoryList" :key="categoryId">
                <category :category="category" />
            </li>
        </ul>
    </div>
</template>

<script>
import Category from '@/components/Category.vue';

export default {
    props: ['categoryList'],
    components: {
        Category,
    }
}
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
    }
</style>
