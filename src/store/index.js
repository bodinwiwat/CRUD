import Vue from "vue";
import Vuex from "vuex";
import cartModule from './modules/cart.js'
import productModule from './modules/products.js'

Vue.use(Vuex);

export default new Vuex.Store({
  stateFactory: true,
  namespaced: true,
  modules: {
    cartStorage: cartModule,
    productStorage: productModule
  },
});