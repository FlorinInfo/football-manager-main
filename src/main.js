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

import AppGame from "./components/AppGame.vue";
Vue.component("AppGame",AppGame)

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  colors: {
    primary:'rgb(36, 33, 69)',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})





// Vue material components

import { MdCard, MdIcon, MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdIcon)
Vue.use(MdButton)

import 'boxicons/css/boxicons.min.css'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
 
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
