<template>
    <div class="app-game" v-if="game">
      <md-card class="md-card-example" style="max-width:100%;margin-top:20px;" >
      <md-card-area md-inset>
        <md-card-media >
          <div 
            class="app-game__background" 
            @click="goLink"
            >
          </div>
        </md-card-media>
        <md-card-header>
          <h2 class="md-title" @click="goLink">{{game.name}}</h2>
          <div style="display:flex;justify-content:space-between;margin-top:10px;">
            <div class="md-subhead">
              <md-icon>location_on</md-icon>
              <span>
                <router-link class="app-game__link" :to="'/campionate/' + game.stadium_id._id">{{game.stadium_id.name}}</router-link>
              </span>
            </div>
            <div class="md-subhead">
              <md-icon>people</md-icon>
              <span style="padding-left:10px;">{{game.players}} / {{game.max_players}}</span>
            </div>
          </div>
        </md-card-header>
      </md-card-area>

      <md-card-content>
        <div class="card-reservation" style="">
            <div class="md-subhead">
              <md-icon>schedule</md-icon>
              <span style="padding-left:10px;">{{game.time.start}}</span>
            </div>
            <div class="md-subhead" style="margin-top:10px;">
              <md-icon>payments</md-icon>
              <span style="padding-left:10px;">{{Math.round(game.price/game.max_players)}} RON</span>
            </div>
        </div>
      </md-card-content>
      <md-card-actions > 
        
        <md-button class="md-primary md-raised" v-if="game.org_id==$store.state.user_id" @click="goLink('/editeaza-campionat/'+game._id)">
          <span>Editeaza</span> 
        </md-button> 
        <md-button class="md-primary"  v-else @click="$emit('registerToGame',game._id)"> 
          <div>
            <span v-if="game.players==game.max_players">In proces</span>
            <span v-else-if="$route.name=='Campionatele mele'||game.reg" >Inscris</span>
            <span v-if="game.reg==false&&game.players!=game.max_players" >Inscrie-te</span>
          </div>
          <!-- <span v-else @click="goLink">Vezi campionat</span> -->
        </md-button>
        <!-- <md-button class="md-primary" v-if="$route.name=='Home'" @click="goLink">Vezi</md-button>
        <md-button class="md-primary" v-else>
          <div v-if="!edit">
            <span v-if="game.players==game.max_players">In proces</span>
            <span v-else-if="game.reg" @click="$emit('registerToGame',game._id)">Inscris</span>
            <span v-if="game.reg==false&&game.players!=game.max_players" @click="$emit('registerToGame',game._id)">Inscrie-te</span>
          </div>
          <span v-else @click="goLink">Vezi campionat</span>
        </md-button>
        <md-button class="md-primary md-raised" v-if="game.org_id==$store.state.user_id&&extented==true" @click="openDTeam">
          <span>Adauga echipe</span> 
        </md-button> -->
      </md-card-actions>
      <div class="app-game__extend" v-if="extented">
        <vs-table striped>
    <template #thead>
      <vs-tr>
        <vs-th>
          Nume Prenume
        </vs-th>
        <vs-th>
          Goluri
        </vs-th>
        <vs-th>
          Echipa
        </vs-th>
      </vs-tr>
    </template>
    <template #tbody>
      <vs-tr
        :key="i"
        v-for="(tr, i) in game.playersFull"
        :data="tr"
      >
        <vs-td>
          {{ tr.player_id.first_name }} {{ tr.player_id.second_name }}
        </vs-td>
        <vs-td>
         {{ tr.player_id.stats.goals }}
        </vs-td>
        <vs-td>
          <vs-select v-if="$store.state.user_id==game.org_id&&$store.state.add_game.teams.length" placeholder="Select" @input="addTeamPlayer(tr.player_id, tr.team_id)" v-model="tr.team_id" :key="$store.state.add_game.teams.length">
            <vs-option :label="t.name" :value="t._id" v-for="(t) in $store.state.add_game.teams" :key="t._id">
              {{t.name}} 
            </vs-option>
          </vs-select>
          <!-- <span v-else-if="tr.team">{{tr.team.team_id.name}} </span> -->
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
        <!-- {{game.playersFull}} -->
      </div>
    </md-card>
    <!-- <AppAddTeam @addTeam="addTeam"/> -->
    </div>
</template>

<script>
// import AppAddTeam from "../components/AppAddTeam.vue";
export default {
  // components:{
  //   AppAddTeam
  // },
    props:{
        game:{
            type:Object,
            default:()=>{}
        },
        edit:{
          type:Boolean,
          default:false
        },
        extented:{
          type:Boolean,
          default:false
        }
    },
    data(){
      return {
        team:""
      }
    },
    methods:{
      getImgUrl () {
        let pic = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        return pic + '.jpg';
      },
      goLink(link){ 
        // alert(typeof link)
        if(typeof link == 'string') {
          this.$router.push(link);
          console.log(link)
        }
        else {
          this.$router.push("/campionat/" + this.game._id);
        }
      },
      openDTeam() {
        this.$store.commit("SET_D_TEAM", true);
      },
      addTeam(name){
          const data = {
              name:name,
              game:this.game._id,
              token:this.$store.state.token,
              user_id:this.$store.state.user_id
          };
          this.axios.post("/add-team", data).then((response)=>{
              response = response.data;
              console.log(response)
              this.$store.commit("SET_AUTH", response.logged);
              if(response.status==true) {
                  this.$store.commit("SET_ADD_TEAMS", response.teams);
                  this.$vs.notification({
                    progress: 'auto',
                    color:"success",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: `Echipa ${name} a fost adaugata cu succes.`
                })
                this.$store.commit("SET_D_TEAM", false);
                this.$emit("loadTeams");
              }
              else {
                this.$vs.notification({
                    progress: 'auto',
                    color:"danger",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: `Echipa ${name} nu poate fi adaugata.`
                })
              }

          }).catch(error=>{
              console.log(error);
          })
      },
      addTeamPlayer(id, team) {
        console.log(team)
        let data = {
            game_id:this.game._id,
            team_id:team,
            player_id:id._id,
            token:this.$store.state.token,
            user_id:this.$store.state.user_id
        }
        console.log(data);
        this.axios.post("/add-team-player", data).then((response)=>{
            response = response.data;
            console.log(response)
            this.$store.commit("SET_AUTH", response.logged);
            if(response.status==true) {
                console.log(response)
                // this.$store.commit("SET_ADD_TEAMS", response.teams);
                // this.team = ""
            }
        }).catch(error=>{
            console.log(error);
        })
      },
    }
}
</script>

<style lang="scss" scoped>
.app-game {

    &__background {
        background-position: center!important;
        background-repeat: no-repeat!important;
        background-size: cover; 
        width: 100%;
        cursor: pointer;
    }

    &__link {
      color: black!important;
      text-decoration: none;
    }

    &__extend {
      padding: 10px;
    }
}

.md-title {
  cursor: pointer;
  color: #ffff!important;
}

.md-card-header {
  background: linear-gradient(60deg, #66bb6a, #43a047)!important;
}

.md-card .md-subhead {
  opacity: 1;
}
</style>