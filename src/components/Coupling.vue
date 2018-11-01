<template>
    <div class="wrapper">
        <button v-if="removable" @click="removeCoupling(coupling)">&#215;</button>
        <div class="item">
            <h2>
                Többlet({{ coupling.surplusProducts.length }})
            </h2>
            <product-list
                :products="coupling.surplusProducts"
                :productClickHandler="!removable ? toggleProductSelection('surplus') : () => {}"/>
        </div>
        <div class="item">
            <h2>
                Hiány({{ coupling.shortageProducts.length }})
            </h2>
            <product-list
                :products="coupling.shortageProducts"
                :productClickHandler="!removable ? toggleProductSelection('shortage') : () => {}"/>
        </div>
        <div class="item">
            <h2>
                <div class="flex">
                    <div>
                        Eredmény
                    </div>
                    <div class="result">
                        {{ removable ? coupling.result.countDiff : selectedProductsResult.countDiff }}
                    </div>
                </div>
            </h2>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["coupling", "removable"],
  components: {
    ProductList
  },
  computed: {
    ...mapGetters(['selectedProductsResult'])
  },
  methods: {
    ...mapActions(["removeCoupling"]),
    toggleProductSelection(categorization) {
      return function(product) {
        this.$store.dispatch("toggleProductSelection", {
          categorization,
          product
        });
      };
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  width: 34px;
  height: 34px;
  position: absolute;
  right: 5px;
  top: 5px;
}

.wrapper {
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.item {
  h2 {
    background-color: #111;
    color: #fff;
    text-align: center;
    padding: 5px;
  }
}

.flex {
  display: flex;
}

.result {
  margin-left: auto;
}
</style>

