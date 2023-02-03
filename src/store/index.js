import Vue from "vue";
import Vuex from "vuex";
import vuexPersistedState from "vuex-persistedstate";
import cart from "./modules/cart";
import category from "./modules/category";
import user from "./modules/user";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    category,
    user,
  },
  plugins: [
    vuexPersistedState({
      key: "xiaotuxian",
      paths: ["cart", "user"],
    }),
  ],
});
