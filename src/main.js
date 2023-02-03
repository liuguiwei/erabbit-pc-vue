import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/components/library";
import "@/assets/styles/common.less";
import "normalize.css";
import "./mock/index";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
