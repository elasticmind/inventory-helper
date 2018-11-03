<template>
    <div
        class="item"
        :class="{
          'not-couplable': clickHandler && !product.couplable,
          'hover-highlight': clickHandler
        }"
        :title="tooltip"
        @click="clickHandler ? clickHandler(product) : () => {}"
        @contextmenu.prevent="clickHandler ? toggleCouplable(product) : () => {}" >
        <div class="product-label">{{ product.productLabel }}</div>
        <div class="product-count">{{ product.productCount }}</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ["product", "clickHandler"],
  computed: {
    tooltip() {
      return `Termék azonosító: ${this.product.productId}
Kategória azonosító: ${this.product.categoryId}
Kategória: ${this.product.categoryPath}`;
    }
  },
  methods: {
    ...mapActions(['toggleCouplable']),
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  position: relative;
  padding: 5px;

  &.not-couplable, {
    color: #f44;
  }
}

.hover-highlight:hover {
  cursor: pointer;
  background: linear-gradient(to left, rgba(98, 255, 150, 0.8), rgba(98, 255, 150, 0.4));
  
  &.not-couplable.product-label {
    color: #222;
  }

  &.not-couplable.product-count {
    color: #fff;
  }
}

.product-count {
  margin-left: auto;
}
</style>
