import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { searchProducts, hasProducts } from '@/util/productsController';

import { listProducts, sortProducts } from '@/util/dataTransformer.js'
import shortageData from '@/data/shortage.json'
import surplusData from '@/data/surplus.json'
const shortage = listProducts(shortageData);
const surplus = listProducts(surplusData);

export default new Vuex.Store({
  state: {
    preFilter: '',
    surplus: {
      products: surplus,
      filter: '',
      selected: [],
    },
    shortage: {
      products: shortage,
      filter: '',
      selected: [],
    },
    couplings: {
      items: [],
      filter: '',
    },
  },
  getters: {
    products: (state) => (categorization) => {
      return state[categorization].products;
    },
    selectedProducts: (state) => (categorization) => {
      return state[categorization].selected;
    },
    filter: (state) => (categorization) => {
      return state[categorization].filter;
    },
    productsCount: (state, getters) => (categorization) => {
      return getters.products(categorization).length;
    },
    filteredProducts: (state, getters) => (categorization) => {
      return searchProducts(
        getters.products(categorization),
        `${state.preFilter} ${getters.filter(categorization)}`
      );
    },
    isProductSelected: (state) => {
      return state.surplus.selected.length + state.shortage.selected.length > 0;
    },
    couplingsCount: (state) => {
      return state.couplings.length;
    },
    filteredCouplings: (state) => {
      return state.couplings.items.filter((coupling) => {
        return hasProducts(coupling.surplusProducts, state.couplings.filter.toLowerCase())
          || hasProducts(coupling.shortageProducts, state.couplings.filter.toLowerCase());
      });
    }
  },
  mutations: {
    setFilter: (state, { categorization, filter }) => {
      state[categorization].filter = filter;
    },
    setPreFilter: (state, { filter }) => {
      state.preFilter = filter;
    },
    toggleProductSelection: (state, {categorization, product}) => {
      toggleSelection(state[categorization].products, product);
      toggleSelection(state[categorization].selected, product);
    },

    addCoupling: (state) => {
      state.couplings.items.push({
        surplusProducts: state.surplus.selected,
        shortageProducts: state.shortage.selected,
      });

      state.surplus.selected = [];
      state.shortage.selected = [];
    },

    addFilteredSurplus: (state, getters) => {
      state.editedCoupling.surplus.push(getters.filteredSurplusProducts);
      removeItems(state.surplus, getters.filteredSurplusProducts);
    },
    addFilteredShortage: (state, getters) => {
      state.editedCoupling.shortage.push(getters.filteredShortageProducts);
      removeItems(state.shortage, getters.filteredShortageProducts);
    },
    removeCoupling: (state, coupling) => {
      var index;
      if (~(index = state.couplings.indexOf(coupling))) {
        state.couplings.splice(index, 1);
        state.surplus.push(...coupling.surplus);
        state.shortage.push(...coupling.shortage);
        sortProducts(state.surplus);
        sortProducts(state.shortage);
      }
    },
  },
})

function toggleSelection(array, item) {
  var index;
  if (~(index = array.indexOf(item))) {
    array.splice(index, 1);
  } else {
    array.push(item);
  }
}

function removeItems(array, items) {
  var index;
  items.forEach((item) => {
    if (~(index = array.indexOf(item))) {
      array.splice(index, 1);
    }
  });
}
