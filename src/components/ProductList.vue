<template>
    <div>
        <ul>
            <li v-for="product in products" :key="product.productId">
                <product :product="product" :clickHandler="productClickHandler" />
            </li>
        </ul>
    </div>
</template>

<script>
import Product from "@/components/Product.vue";

export default {
  props: ["products", "productClickHandler"],
  components: {
    Product
  }
};
</script>

<style lang="scss" scoped>
ul {
    background-color: #444;
    padding: 10px;
    max-height: 50vh;
    overflow: auto;
}

li {
  color: #ddd;
  
  &:nth-of-type(2n) {
    background-color: #333;
  }
}
</style>
