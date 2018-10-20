<template>
    <div>
        <h2 class="title">{{ title }}</h2>
        <input type=text v-model="searchText"/>
        <category-list :categoryList="filteredCategoryList" />
    </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'

export default {
    data() {
        return {
            searchText: '',
        }
    },
    props: ['title', 'categorization'],
    computed: {
        filteredCategoryList() {
            return this.categorization.filter((category) => {
                return category.path.some((categoryLabel) => {
                    return categoryLabel.toLowerCase().includes(this.searchText.toLowerCase());
                });
            });
        },
    },
    components: {
        CategoryList,
    }
}
</script>

<style>

</style>
