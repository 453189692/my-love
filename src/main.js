import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "./permission"; // permission control

import "@/components/css/default.css"

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
});

