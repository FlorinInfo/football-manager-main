import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:6626';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Components

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})

import 'boxicons/css/boxicons.min.css'
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
