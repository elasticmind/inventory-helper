<template>
    <div class="wrapper">
        <button v-if="removable" @click="removeCoupling(coupling)">&#215;</button>
        <div class="item">
            <h3>
                Többlet({{ coupling.surplusProducts.length }})
            </h3>
            <product-list
                :products="coupling.surplusProducts"
                :productClickHandler="!removable ? toggleProductSelection('surplus') : null"/>
        </div>
        <div class="item">
            <h3>
                Hiány({{ coupling.shortageProducts.length }})
            </h3>
            <product-list
                :products="coupling.shortageProducts"
                :productClickHandler="!removable ? toggleProductSelection('shortage') : null"/>
        </div>
        <div class="item">
            <h3>
                <div class="flex">
                    <div>
                        Eredmény
                    </div>
                    <div class="result">
                        {{ removable ? coupling.result.countDiff : selectedProductsResult.countDiff }}
                    </div>
                </div>
            </h3>
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
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
}

.wrapper {
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.item {
  h3 {
    background: linear-gradient(to top right, #111, #222, #111);
    color: #fff;
    text-align: center;
    padding: 5px 15px;
  }
}

.flex {
  display: flex;
}

.result {
  margin-left: auto;
}
</style>

