import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { searchProducts, hasProducts } from '@/util/productsController';

import { sortProducts, mapPureData } from '@/util/dataTransformer.js'

export default new Vuex.Store({
  state: {
    preFilter: '',
    persistPreFilter: false,
    surplus: {
      products: [],
      filter: '',
      persistFilter: false,
      selected: [],
    },
    shortage: {
      products: [],
      filter: '',
      persistFilter: false,
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
    isCouplableSurplusLeft: (state) => {
      return state.surplus.products
        .filter(product => product.couplable)
        .length > 0;
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
    persistFilter: (state) => (categorization) => {
      return state[categorization].persistFilter;
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
        surplusCountSum: surplusCountSum.toFixed(3),
        shortageCountSum: shortageCountSum.toFixed(3),
        countDiff: (surplusCountSum + shortageCountSum).toFixed(3),
        surplusValueSum: surplusValueSum.toFixed(2),
        shortageValueSum: shortageValueSum.toFixed(2),
        valueDiff: valueDiff(surplusValueSum, shortageValueSum).toFixed(2),
      };
    },
    selectedProductsLabelWords: (state) => {
      return [...state.surplus.selected, ...state.shortage.selected]
        .reduce((words, product) => [
          ...words,
          ...product.categoryPath.toLowerCase().split('\\ '),
          ...product.productLabel.toLowerCase().split(' ')
        ], []);
    },
    isCouplingAddable: (state, getters) => {
      return getters.isProductSelected;
    }
  },
  mutations: {
    setFilter: (state, { categorization, filter }) => {
      state[categorization].filter = filter;
    },
    setPreFilter: (state, { filter }) => {
      state.preFilter = filter;
    },
    setPersistFilter: (state, { categorization, value }) => {
      state[categorization].persistFilter = value;
    },
    setPersistPreFilter: (state, { value }) => {
      state.persistPreFilter = value;
    },
    toggleProductSelection: ( state, { categorization, product }) => {
      toggleSelection(state[categorization].products, product);
      toggleSelection(state[categorization].selected, product);
    },
    toggleProductsSelection: ( state, { categorization, products }) => {
      toggleSelection(state[categorization].products, ...products);
      toggleSelection(state[categorization].selected, ...products);
    },
    resetFilters: ( state ) => {
      if (!state.persistPreFilter) {
        state.preFilter = '';
      }
      if (!state.surplus.persistFilter) {
        state.surplus.filter = '';
      }
      if (!state.shortage.persistFilter) {
        state.shortage.filter = '';
      }
    },
    toggleCouplable: (state, product) => {
      product.couplable = !product.couplable;
    }
  },
  actions: {
    loadSurplus: ({state}, data) => {
      state.surplus.products = mapPureData(data);
      sortProducts(state.surplus.products);
    },
    loadShortage: ({state}, data) => {
      state.shortage.products = mapPureData(data);
      sortProducts(state.shortage.products);
    },
    addFirstSurplus: ({ getters, dispatch }) => {
      if (getters.isCouplableSurplusLeft) {
        dispatch('toggleProductSelection', {
          categorization: 'surplus',
          product: getters.surplusHead,
        });
      }
    },
    toggleCouplable: ( {commit, dispatch}, product ) => {
      commit('toggleCouplable', product);
      dispatch('resort');
    },
    toggleProductSelection: ({ commit, dispatch }, { categorization, product }) => {
      commit('toggleProductSelection', {categorization, product});
      dispatch('resort');
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
    addFilteredProducts: ({ getters, commit, dispatch }, categorization) => {
      var products = getters.filteredProducts(categorization);
      commit('toggleProductsSelection', {
        categorization,
        products,
      })
      dispatch('resort', categorization);
    },
    resort: ({ state, getters }) => {
      sortProducts(state.surplus.products, getters.selectedProductsLabelWords);
      sortProducts(state.shortage.products, getters.selectedProductsLabelWords);
      sortProducts(state.surplus.selected);
      sortProducts(state.shortage.selected);
    },    
    addCoupling: ({ state, getters, commit, dispatch }) => {
      state.couplings.items.push({
        surplusProducts: state.surplus.selected,
        shortageProducts: state.shortage.selected,
        result: getters.selectedProductsResult,
      });

      state.surplus.selected = [];
      state.shortage.selected = [];

      commit('resetFilters');
      dispatch('addFirstSurplus');
    },
  },
})

function toggleSelection(array, ...items) {
  var index;
  items.forEach(item => {
    if (~(index = array.indexOf(item))) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
  })
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
