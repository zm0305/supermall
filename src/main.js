import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from "fastclick";

import toast from "components/common/toast"

Vue.config.productionTip = false
//安装toast插件
Vue.use(toast);

//解决移动端300ms的延迟问题
FastClick.attach(document.body);

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')