<template>
    <div
        class="item hover-highlight"
        :title="tooltip"
        @click="clickHandler(product)" >
        <div class="product-label">{{ product.label }}</div>
        <div class="product-count">{{ product.count }}</div>
    </div>
</template>

<script>
export default {
  props: ["product", "clickHandler"],
  computed: {
    tooltip() {
      const joinedPath = this.product.path.join("\\");
      return `Termék azonosító: ${this.product.id}
Kategória azonosító: ${this.product.categoryId}
Kategória: ${joinedPath}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  position: relative;
  padding: 5px;
}

.hover-highlight:hover {
  cursor: pointer;
  background: linear-gradient(to left, rgba(98, 255, 150, 0.8), rgba(98, 255, 150, 0.4));
  
  .product-label {
    color: #222;
  }

  .product-count {
    color: #fff;
  }
}

.product-count {
  margin-left: auto;
}
</style>
