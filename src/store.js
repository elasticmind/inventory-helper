import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { searchProducts, hasProducts } from '@/util/productsController';

import { sortProducts } from '@/util/dataTransformer.js'

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
    isSurplusLeft: (state) => {
      return state.surplus.products.length > 0;
    },
    surplusHead: (state) => {
      return state.surplus.products[0] || {};
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
    couplingsItems: (state) => {
      return state.couplings.items;
    },
    couplingsCount: (state, getters) => {
      return getters.couplingsItems.length;
    },
    filteredCouplings: (state) => {
      return state.couplings.items.filter((coupling) => {
        return hasProducts(coupling.surplusProducts, state.couplings.filter.toLowerCase())
          || hasProducts(coupling.shortageProducts, state.couplings.filter.toLowerCase());
      });
    },
    selectedProductsResult: (state) => {
      const surplusCountSum = countSum(state.surplus.selected);
      const shortageCountSum = countSum(state.shortage.selected);
      const surplusValueSum = valueSum(state.surplus.selected);
      const shortageValueSum = valueSum(state.shortage.selected);

      return {
        surplusCountSum,
        shortageCountSum,
        countDiff: surplusCountSum + shortageCountSum,
        surplusValueSum,
        shortageValueSum,
        valueDiff: valueDiff(surplusValueSum, shortageValueSum),
      };
    },
    selectedProductsLabelWords: (state) => {
      return [...state.surplus.selected, ...state.shortage.selected]
        .reduce((words, product) => [...words, ...product.productLabel.toLowerCase().split(' ')], []);
    },
    isCouplingAddable: (state, getters) => {
      return getters.isProductSelected && getters.selectedProductsResult.countDiff <= 0;
    }
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
      state.surplus.products = data;
    },
    loadShortage: ({state}, data) => {
      state.shortage.products = data;
    },
    addFirstSurplus: ({ getters, dispatch }) => {
      if (getters.isSurplusLeft) {
        dispatch('toggleProductSelection', {
          categorization: 'surplus',
          product: getters.surplusHead,
        });
      }
    },
    toggleProductSelection: ({ state, getters, commit }, { categorization, product }) => {
      commit('toggleProductSelection', {categorization, product});
      sortProducts(state.surplus.products, getters.selectedProductsLabelWords);
      sortProducts(state.shortage.products, getters.selectedProductsLabelWords);
      sortProducts(state[categorization].selected);
    },
    removeCoupling: ({ state, getters }, coupling) => {
      var index;
      if (~(index = state.couplings.items.indexOf(coupling))) {
        state.couplings.items.splice(index, 1);
        state.surplus.products.push(...coupling.surplusProducts);
        state.shortage.products.push(...coupling.shortageProducts);
        sortProducts(state.surplus.products, getters.selectedSurplusProductsLabelWords);
        sortProducts(state.shortage.products, getters.selectedSurplusProductsLabelWords);
      }
    },
    toggleProductsSelection: ({ dispatch }, { categorization, products }) => {
      products.forEach((product) => {
        dispatch('toggleProductSelection', { categorization, product })
      });
    },
    addFilteredProducts: ({ getters, dispatch }, categorization) => {
      var products = getters.filteredProducts(categorization);
      dispatch('toggleProductsSelection', {
        categorization,
        products,
      })
    },
    addCoupling: ({ state, getters, dispatch }) => {
      state.couplings.items.push({
        surplusProducts: state.surplus.selected,
        shortageProducts: state.shortage.selected,
        result: getters.selectedProductsResult,
      });

      state.surplus.selected = [];
      state.shortage.selected = [];

      dispatch('addFirstSurplus');
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

function sumProductsField(products, field) {
  return products.reduce((sum, product) => sum + product[field], 0);
}

function countSum(products) {
  return sumProductsField(products, 'productCount');
}

function valueSum(products) {
  return sumProductsField(products, 'productValue');
}

function valueDiff(surplusValueSum, shortageValueSum) {
  return Math.min(
    Math.abs(surplusValueSum),
    Math.abs(shortageValueSum)
  );
}
