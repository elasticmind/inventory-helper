import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { searchProducts, hasProducts } from '@/util/productsController';

import { listProducts, sortProducts } from '@/util/dataTransformer.js'

export default new Vuex.Store({
  state: {
    preFilter: '',
    surplus: {
      products: [],
      filter: '',
      selected: [],
    },
    shortage: {
      products: [],
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
      return state.couplings.items.length;
    },
    filteredCouplings: (state) => {
      return state.couplings.items.filter((coupling) => {
        return hasProducts(coupling.surplusProducts, state.couplings.filter.toLowerCase())
          || hasProducts(coupling.shortageProducts, state.couplings.filter.toLowerCase());
      });
    },
    selectedProductsResult: (state) => {
      return (
        sumProducts(state.surplus.selected) +
        sumProducts(state.shortage.selected)
      );
    },
    selectedSurplusProductsLabelWords: (state) => {
      return state.surplus.selected
        .reduce((words, product) => [...words, ...product.label.toLowerCase().split(' ')], []);
    },
  },
  mutations: {
    setFilter: (state, { categorization, filter }) => {
      state[categorization].filter = filter;
    },
    setPreFilter: (state, { filter }) => {
      state.preFilter = filter;
    },
    toggleProductSelection: ( state, { categorization, product }) => {
      toggleSelection(state[categorization].products, product);
      toggleSelection(state[categorization].selected, product);
    },
  },
  actions: {
    loadSurplus: ({state}, data) => {
      state.surplus.products = listProducts(data);
    },
    loadShortage: ({state}, json) => {
      state.shortage.products = listProducts(json);
    },
    toggleProductSelection: ({ state, getters, commit }, { categorization, product }) => {
      commit('toggleProductSelection', {categorization, product});
      // TODO: You know better than this...
      sortProducts(state[categorization].products);
      if (categorization === 'surplus') {
        sortProducts(state.shortage.products, getters.selectedSurplusProductsLabelWords);
      }
      sortProducts(state[categorization].selected);
    },
    removeCoupling: ({ state, getters }, coupling) => {
      var index;
      if (~(index = state.couplings.items.indexOf(coupling))) {
        state.couplings.items.splice(index, 1);
        state.surplus.products.push(...coupling.surplusProducts);
        state.shortage.products.push(...coupling.shortageProducts);
        sortProducts(state.surplus.products);
        sortProducts(state.shortage.products, getters.selectedSurplusProductsLabelWords);
      }
    },
    toggleProductsSelection: ({ commit }, { categorization, products }) => {
      products.forEach((product) => {
        commit('toggleProductSelection', { categorization, product })
      });
    },
    addFilteredProducts: ({ getters, dispatch }, categorization) => {
      var products = getters.filteredProducts(categorization);
      dispatch('toggleProductsSelection', {
        categorization,
        products,
      })
    },
    addCoupling: ({ state, getters }) => {
      state.couplings.items.push({
        surplusProducts: state.surplus.selected,
        shortageProducts: state.shortage.selected,
        result: getters.selectedProductsResult,
      });

      state.surplus.selected = [];
      state.shortage.selected = [];
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

function sumProducts(products) {
  return products.reduce((sum, product) => sum + product.count, 0);
}
