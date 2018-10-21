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
    editedCoupling: {
      surplus: [],
      shortage: [],
    },
    couplings: []
  },
  getters: {
    isEditedCouplingEmpty: (state) => {
      return state.editedCoupling.surplus.length === 0
        && state.editedCoupling.shortage.length === 0;
    },
  },
  mutations: {
    selectSurplus: (state, product) => {
      toggleSelection(state.surplus, product);
      sortProducts(state.surplus);
      toggleSelection(state.editedCoupling.surplus, product);
      sortProducts(state.editedCoupling.surplus);
    },
    selectShortage: (state, product) => {
      toggleSelection(state.shortage, product);
      sortProducts(state.shortage);
      toggleSelection(state.editedCoupling.shortage, product);
      sortProducts(state.editedCoupling.shortage);
    },
    addCoupling: (state) => {
      state.couplings.push(state.editedCoupling);
      state.editedCoupling = {
        surplus: [],
        shortage: [],
      };
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
