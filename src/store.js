import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { listProducts, sortProducts } from '@/util/dataTransformer.js'
import shortageData from '@/data/shortage.json'
import surplusData from '@/data/surplus.json'
const shortage = listProducts(shortageData);
const surplus = listProducts(surplusData);

export default new Vuex.Store({
  state: {
    // TODO: Consistent naming, ie.: surpluses, selectedSurpluses, etc.
    surplus,
    shortage,
    commonSearchTerm: null,
    selectedSurplus: [],
    selectedShortage: [],
    couplings: []
  },
  getters: {},
  mutations: {
    selectSurplus: (state, product) => {
      toggleSelection(state.selectedSurplus, product);
      sortProducts(state.selectedSurplus);
    },
    selectShortage: (state, product) => {
      toggleSelection(state.selectedShortage, product);
      sortProducts(state.selectedShortage);
    },
    refreshSurplus: (state) => {
      state.selectedSurplus.forEach((toRemove) => {
        state.surplus.splice(state.surplus.indexOf(toRemove), 1);
      });
    },
    refreshShortage: (state) => {
      state.selectedShortage.forEach((toRemove) => {
        state.shortage.splice(state.shortage.indexOf(toRemove), 1);
      });
    },
    resetSurplusSelection: (state) => {
      state.selectedSurplus = [];
    },
    resetShortageSelection: (state) => {
      state.selectedShortage = [];
    },
    addCoupling: (state, { surplus, shortage }) => {
      const result = sumProducts(surplus) + sumProducts(shortage);

      state.couplings.push({
        surplus,
        shortage,
        result
      });
    },
    toggleSearchLock: (state, text) => {
      if (state.commonSearchTerm === null) {
        state.commonSearchTerm = text;
      } else {
        state.commonSearchTerm = null;
      }
    },
  },
  actions: {
    couple: ({state, commit}) => {
      commit('addCoupling', {
        surplus: state.selectedSurplus,
        shortage: state.selectedShortage
      });
      commit('refreshSurplus');
      commit('refreshShortage');
      commit('resetSurplusSelection');
      commit('resetShortageSelection');
    }
  }
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
