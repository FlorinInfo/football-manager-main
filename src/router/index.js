import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Homepage.vue'
import Games from "../views/Games.vue";
import Stadiums from "../views/Stadiums.vue";
import GameAdd from "../views/GameAdd.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/campionate/:stadium_id?",
    name:"Games",
    component:Games
  },
  {
    path:"/stadioane",
    name:"Stadiums",
    component:Stadiums
  },
  {
    path:"/creeaza-campionat",
    name:"GameAdd",
    component:GameAdd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
