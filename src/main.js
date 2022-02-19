
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

import AppGame from "./components/AppGame.vue";
Vue.component("AppGame",AppGame) 

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import vuetify from "./plugins/vuetify";

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// axios.defaults.baseURL = 'https://football-backend-manager.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:6626/';

import Vuex from 'vuex'
Vue.use(Vuex)
import store from "./store";

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);



// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  vuetify,
  store,

  data: {
    Chartist: Chartist,
  },
});
