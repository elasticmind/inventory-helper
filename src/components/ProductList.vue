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
    max-height: 200px;
    overflow: auto;
    box-shadow: 0 -10px 20px -10px rgba(0, 0, 0, 0.5) inset;
}

li {
  color: #ddd;
  
  &:nth-of-type(2n) {
    background-color: #333;
  }
}
</style>
