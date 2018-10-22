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
      console.log('státe', state);
      console.log('lö categorization', categorization);
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
      sortProducts(state[categorization].products);
      sortProducts(state[categorization].selected);
    },
    addCoupling: (state) => {
      state.couplings.items.push({
        surplusProducts: state.surplus.selected,
        shortageProducts: state.shortage.selected,
      });

      state.surplus.selected = [];
      state.shortage.selected = [];
    },
    removeCoupling: (state, coupling) => {
      var index;
      if (~(index = state.couplings.items.indexOf(coupling))) {
        state.couplings.items.splice(index, 1);
        state.surplus.products.push(...coupling.surplusProducts);
        state.shortage.products.push(...coupling.shortageProducts);
        sortProducts(state.surplus.products);
        sortProducts(state.shortage.products);
      }
    },
  },
  actions: {
    toggleProductsSelection: ({commit}, {categorization, products}) => {
      products.forEach((product) => {
        commit('toggleProductSelection', {categorization, product})
      });
    },
    addFilteredProducts: ({getters, dispatch}, categorization) => {
      console.log('durvul', categorization);
      var products = getters.filteredProducts(categorization);
      dispatch('toggleProductsSelection', {
        categorization,
        products,
      })
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
