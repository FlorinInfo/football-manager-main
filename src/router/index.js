import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Homepage.vue';
import Games from "../views/Games.vue";
import Stadiums from "../views/Stadiums.vue";
import GameAdd from "../views/GameAdd.vue";
import Statistics from "../views/Statistics.vue";
import Game from "../views/Game.vue";

import Test from "../views/Test.vue";

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
  },
  {
    path:"/statistici/:type",
    name:"Statistics",
    component:Statistics
  },
  {
    path:"/campionat/:id/:c_type?",
    name:"Campionat",
    component:Game
  },
  {
    path:"/test/",
    name:"Campionat",
    component:Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
