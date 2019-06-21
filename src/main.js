import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import axios from './lib/axios'
Vue.use(axios)

import filters from './lib/filters'
Vue.use(filters)

// 引入shengya-ui
import 'shengya-ui/assets/stylesheets/application.scss'
import shengyaUi from 'shengya-ui'
Vue.use(shengyaUi)

import '@/assets/stylesheets/scss/application.scss'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
