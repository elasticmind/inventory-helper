<template>
    <div>
        <h2 class="title">{{ title }}({{ productsCount(categorization) }})</h2>
        <div class="filter-wrapper">
          <input type="checkbox" v-model="persistSearch">
          <input
              type=text
              v-model="searchText"/>
        </div>
        <product-list
            :products="filteredProducts(categorization)"
            :productClickHandler="toggleProductSelection(categorization)" />
    </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { mapGetters } from "vuex";

export default {
  props: ["title", "categorization", "preFilter"],
  computed: {
    ...mapGetters([
      "productsCount",
      "filter",
      "persistFilter",
      "isProductSelected",
      "filteredProducts"
    ]),
    searchText: {
      get() {
        return this.filter(this.categorization);
      },
      set(filter) {
        this.$store.commit("setFilter", {
          categorization: this.categorization,
          filter
        });
      }
    },
    persistSearch: {
      get() {
        return this.persistFilter(this.categorization);
      },
      set(value) {
        this.$store.commit("setPersistFilter", {
          categorization: this.categorization,
          value
        });
      }
    },
  },
  methods: {
    toggleProductSelection(categorization) {
      return function(product) {
        this.$store.dispatch("toggleProductSelection", {
          categorization,
          product
        });
      };
    }
  },
  components: {
    ProductList
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  color: #eee;
}
</style>
