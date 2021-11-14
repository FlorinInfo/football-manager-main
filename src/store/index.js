import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:6626';



export default new Vuex.Store({
  state: {
    user_id:localStorage.getItem("user_id"),
    token:localStorage.getItem("token"),
    auth:false,
    errors_auth:{
      email:false,
      password:false
    },
    stadiums:[],
    add_game:{
      stadiums:[],
      name:null,
      stadium_id:null,
      time:{
        start:null,
        end:null
      },
      players:[],
      teams:null,
      games:[]
    },
    games:[],
    loader:false
  },
  mutations: {
    SET_ERRORS_AUTH(state,errors) {
      state.errors_auth.email = errors.email;
      state.errors_auth.password = errors.password;
    },
    SET_STADIUMS(state,stadiums) {
      state.stadiums = stadiums
    },
    SET_ADD_GAME(state, game) {
      state.add_game = game;
    },
    LOGOUT_USER(){
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.setItem("logged", false);
      window.location = "/"
    },
    SET_GAMES(state, games){
      state.games = games;
    },
    SET_ADD_TEAMS(state, teams) {
      state.add_game.teams = [...teams];
      console.log(1111111111111111111111)
    },
    SET_AUTH(state, auth){
      state.auth = auth;
      if(auth != true&&localStorage.getItem("logged")=='true') {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.setItem("logged", auth);
        window.location = "/";
      }
    }
  },
  actions: {
    loginUser({commit}, credentials) {
      axios.post('/login', credentials).then((response) => {
        response = response.data;
        console.log(response);
        if(response.logged&&response.status) {
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("token", response.token);
          localStorage.setItem("logged", true)
          location.reload()
        }
        commit("SET_AUTH",response.logged);
        commit("SET_ERRORS_AUTH",response.errors);
      })
    },
    getStadiums({commit, state}) {
      const credentials = {
        user_id:state.user_id,
        token:state.token
      }
      axios.get('/stadiums', { params:credentials }).then((response) => {
        response = response.data;
        console.log(response)
        commit("SET_AUTH",response.logged);
        commit("SET_STADIUMS",response);
      })
    },
    getAddGame({commit, state}, game_id){
      const credentials = {
        user_id:state.user_id,
        token:state.token,
        game_id
      }
      axios.get('/add-game', { params:credentials }).then((response) => {
        response = response.data;
        console.log(response)
        console.log(response)
        commit("SET_AUTH",response.logged);
        if(response.game){
          response.game.teams = [...response.teams];
          response.game.players = [...response.players];
          // response.games = response.games.reverse();
          response.game.games = [...response.games]
          response.game.games = response.game.games.reverse()
          console.log("zzzz",response.game) 
          commit("SET_ADD_GAME",response.game);
        }
        else {
          response.games = response.games.reverse()
          commit("SET_ADD_GAME",response);
        }
        
      })
    },
    getGames({commit, state},stadium_id) {
      const data = {
        user_id:state.user_id,
        token:state.token,
        stadium_id
      }
      axios.get('/get-games', { params:data }).then((response) => {
        response = response.data;
        console.log(response)
        commit("SET_AUTH",response.logged); 
        commit("SET_GAMES",response.games.reverse());
      })
    },
  },
  modules: {
  },
  getters: {
    errors_Auth: (state) => {
      return state.errors_auth;
    },
    logged_User() {
      return localStorage.getItem('logged');
    }
  }
})
