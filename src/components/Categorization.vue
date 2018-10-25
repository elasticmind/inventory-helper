<template>
    <div class="categorization">
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
  data() {
    return {
      persistSearch: false
    };
  },
  computed: {
    ...mapGetters([
      "productsCount",
      "filter",
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
    }
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
  watch: {
    isProductSelected(changedTo) {
      if (!this.persistSearch && changedTo) {
        this.searchText = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 10px 0;
  color: #eee;
}

.categorization {
    padding: 10px;
}
</style>
