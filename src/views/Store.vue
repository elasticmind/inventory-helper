<template>
    <div class="store-wrapper">
        <div class="prefilter-wrapper filter-wrapper">
            <input type="checkbox" v-model="persistSearch">
            <input type="text" v-model="searchText">
        </div>
        <div class="flex">
            <categorization
                title="Többlet"
                categorization="surplus"
                class="half-pane" />
            <categorization
                title="Hiány"
                categorization="shortage"
                class="half-pane" />
        </div>
        <div class="flex margin-v">
            <button @click="() => addFilteredProducts('surplus')">Összes hozzáadása</button>
            <button @click="() => addFilteredProducts('shortage')">Összes hozzáadása</button>
        </div>
        <coupling class="coupling" :coupling="coupling" />
        <button @click="addCoupling" class="margin-v" :disabled="!isCouplingAddable">Összevon</button>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Categorization from "@/components/Categorization";
import Coupling from "@/components/Coupling";

export default {
  computed: {
    ...mapState(["preFilter", "persistPreFilter"]),
    ...mapGetters([
      "selectedProducts",
      "selectedProductsResult",
      "isProductSelected",
      "isCouplingAddable"
    ]),
    coupling() {
      return {
        surplusProducts: this.selectedProducts("surplus"),
        shortageProducts: this.selectedProducts("shortage")
      };
    },
    searchText: {
      get() {
        return this.preFilter;
      },
      set(filter) {
        this.$store.commit("setPreFilter", { filter });
      }
    },
    persistSearch: {
      get() {
        return this.persistPreFilter;
      },
      set(value) {
        this.$store.commit("setPersistPreFilter", { value });
      }
    },
  },
  components: {
    Categorization,
    Coupling
  },
  methods: {
    ...mapGetters(["filteredSurplus", "filteredShortage"]),
    ...mapActions(["addFilteredProducts", "addCoupling"])
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.half-pane {
  width: 45%;
}

.prefilter-wrapper {
  width: 500px;
}

.coupling {
  width: 80%;
  margin: 0 auto 10px;
}

.margin-v {
  margin-top: 10px;
  margin-bottom: 10px;
}

button {
  display: block;
  margin: 0 auto;
}
</style>

