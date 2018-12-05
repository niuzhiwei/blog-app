// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store/index.js'
import Util from '@/helpers/util'
import './assets/reset.css'
import './assets/base.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Util);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
