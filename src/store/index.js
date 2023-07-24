import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import categories from './categories'
import products from './products'
import orders from './orders'
import users from './users'
import settings from './settings'
import restaurants from './restaurants'
import modifiers from './modifiers'
import cashup from './cashup'
import customer from './customer'
import payments from './payments'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      categories,
      products,
      orders,
      users,
      settings,
      restaurants,
      modifiers,
      cashup,
      customer,
      payments
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
