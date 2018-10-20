import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { categorize } from '@/util/dataTransformer.js'
import shortageData from '@/data/shortage.json'
import surplusData from '@/data/surplus.json'
const shortage = categorize(shortageData);
const surplus = categorize(surplusData);

export default new Vuex.Store({
  state: {
    surplus,
    shortage,
  },
  getters: {
    filteredCategorization: (state) => (categorization, text) => {
      return categorization.filter((category) => {
        console.log(category)
        return category.products.filter((product) => {
          return product.label.includes(text);
        });
      });
    }
  },
  mutations: {

  },
  actions: {

  }
})
