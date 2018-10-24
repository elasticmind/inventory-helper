<template>
    <div>
        <ul>
            <li class="zsuzsi" v-for="product in products" :key="product.label">
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
}

li {
  color: #ddd;
  
  &:nth-of-type(2n) {
    background-color: #333;
  }
}
</style>
