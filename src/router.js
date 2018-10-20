import Vue from 'vue'
import Router from 'vue-router'
import Store from './views/Store.vue'
import Couplings from './views/Couplings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/store',
      component: Store
    },
    {
      path: '/couplings',
      component: Couplings
    }
  ]
})
