<template>
    <div class="app-game-add" v-if="$store.state.add_game">
        <div style="display:flex;padding:0 20px;">
            <h2 class="app-game-add__title" v-if="$store.state.add_game.games.length==0">Nu ai creat nici un campionat pana acum.</h2>
            <h2 class="app-game-add__title" v-else>Campionate create</h2>
            <vs-button style="margin-left:auto;" @click="openCreate">
                <i class='bx bx-add-to-queue'></i> &nbsp;Creeaza campionat
            </vs-button>
        </div>
        <vs-row  >
        <vs-col lg="6" sm="6" xs="12" style="padding:1rem;" v-for="g in $store.state.add_game.games" :key="g._id">
          <AppGame :game="g" :edit="true"/>
        </vs-col>
      </vs-row>

      <vs-dialog  v-model="create">
        <template #header>
          <h4 class="not-margin">
            Creeaza campionat
          </h4>
        </template>


        <div class="con-form">
            <vs-input v-model="game.name" class="input-top" placeholder="Nume campionat" :disabled="$store.state.add_game.name"  >
                <template #icon>
                <i class='bx bx-trophy' ></i>
                </template>
                <template #message-danger v-if="errors&&errors.name" >
                    <span style="display:block;margin-top:-8px!important; ">{{errors.name}}</span>
                </template>
            </vs-input>
            <vs-input v-model="game.max_players" class="input-top" type="number" placeholder="Numar maxim jucatori">
                <template #icon>
                    <i class='bx bx-user' ></i>
                </template>
                <template #message-danger v-if="errors&&errors.max_players" >
                    <span style="display:block;margin-top:-8px!important; ">{{errors.max_players}}</span>
                </template>
            </vs-input>
            <vs-input v-model="game.price" type="number" class="input-top" placeholder="Pret" >
                <template #icon>
                    <i class='bx bx-money' ></i>
                </template>
                <template #message-danger v-if="errors&&errors.price" >
                    <span style="display:block;margin-top:-8px!important; ">{{errors.price}}</span>
                </template>
            </vs-input>
            <vs-select 
                style="margin-top:10px;"
                class="input-top"
                :key="$store.state.add_game.stadiums.length"
                placeholder="Stadion"
                v-model="game.stadium_id">
                <vs-option v-for="s in $store.state.add_game.stadiums" :label="s.name" :key="s._id" :value="s._id">
                    {{s.name}} 
                </vs-option>
                <template #message-danger v-if="errors&&errors.stadium_id" >
                    <span style="display:block; ">{{errors.stadium_id}}</span>
                </template>
            </vs-select>
            <VueCtkDateTimePicker label="Incepe la"  class="app-game-add__time-el input-top" v-model="game.time.start" :disabled="$store.state.add_game.name" />
            <VueCtkDateTimePicker label="Sfarseste la" class="app-game-add__time-el input-top" v-model="game.time.end" :disabled="$store.state.add_game.name"/>
            <span v-if="errors&&errors.time" class="err-template">{{errors.time}}</span>
        </div>
        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="addGame">
              Creeaza
            </vs-button>
          </div>
        </template>
      </vs-dialog>
        <!-- <div class="app-game-add__input">
            <vs-input v-model="game.name" placeholder="Nume campionat" :disabled="$store.state.add_game.name"  >
                <template #icon>
                <i class='bx bx-trophy' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__time">
            <VueCtkDateTimePicker label="Incepe la" class="app-game-add__time-el" v-model="game.time.start" :disabled="$store.state.add_game.name" />
            <VueCtkDateTimePicker label="Sfarseste la" class="app-game-add__time-el" v-model="game.time.end" :disabled="$store.state.add_game.name"/>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="game.stadium_id.name" placeholder="Nume stadion" :disabled="$store.state.add_game.stadium_id" v-if="$store.state.add_game.stadium_id" >
                <template #icon>
                <i class='bx bx-trophy' ></i>
                </template>
            </vs-input>
            <vs-select 
            :key="$store.state.add_game.stadiums.length"
                v-else
                placeholder="Stadion"
                v-model="game.stadium_id">
                <vs-option v-for="s in $store.state.add_game.stadiums" :label="s.name" :key="s._id" :value="s._id">
                    {{s.name}} 
                </vs-option>
            </vs-select>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="game.max_players" type="number" placeholder="Numar maxim jucatori" :disabled="$store.state.add_game.max_players">
                <template #icon>
                    <i class='bx bx-user' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="game.price" type="number" placeholder="Pret" :disabled="$store.state.add_game.price">
                <template #icon>
                    <i class='bx bx-money' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input" style="display:flex" v-if="$store.state.add_game.name">
        <vs-input placeholder="Nume echipa" v-model="team">
            <template #icon>
                <i class='bx bxl-microsoft-teams' ></i>
            </template>
        </vs-input>
        <vs-button @click="addTeam">
            <i class="bx bx-home-alt"></i> Adauga echipa
        </vs-button>
        </div>
        <div class="app-game-add__input" >
            {{$store.state.add_game.teams}}
            <vs-table>
                <template #thead>
                <vs-tr>
                    <vs-th>
                    Nume
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
                <vs-tr v-for="player in $store.state.add_game.players" :key="player._id">
                    <vs-td>
                    {{player.player_id.first_name}}  {{player.player_id.second_name}} 
                    </vs-td>
                    <vs-td>
                    150
                    </vs-td>
                    <vs-td>            
                    <vs-select placeholder="Select" :key="$store.state.add_game.teams.length" v-model="z" @change="addTeamPlayer()">
                        <vs-option v-for="t in $store.state.add_game.teams" :key="t.id" :label="t.name" :value="t._id">
                            {{t.name}}
                        </vs-option>
                    </vs-select>
                    </vs-td>
                </vs-tr>
                </template>
            </vs-table>
        </div>
        <div>
        <vs-button
            @click="addGame"
            block
        >
            <i class='bx bx-play' ></i>Programeaza campionat
        </vs-button>
        </div> -->
         
        <!-- {{$store.state.add_game}} -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            value2:'',
            game_id:null,
            game:{
                org_id:localStorage.getItem("user_id"),
                name:"",
                stadium_id:"",
                price:"",
                max_players:"",
                teams:[],
                time:{
                    start:"",
                    end:""
                }
            },
            team:"",
            errors:null,
            teams:[],
            z:'',
            create:false
        }
    },
    // computed:{
    //     teams(){
    //         return this.$store.state.add_game.teams;
    //     }
    // },
    methods:{
        addGame(){
            const loading = this.$vs.loading()
            const data = {
                token:this.$store.state.token,
                user_id:this.$store.state.user_id,
                ...this.game
            }
            this.axios.post("/add-game", data).then((response)=>{
                response = response.data;
                console.log(response)
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
                    this.game.name = "";
                    this.game.price = "";
                    this.game.time.start = "";
                    this.game.time.end = "";
                    this.game.max_players = "";
                    this.game.stadium_id = "";
                    // this.game_id = response.gameSave._id;
                    // localStorage.setItem("game_id", this.game_id);
                    // this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
                    this.create = false;
                }
                else {
                    this.errors = response.errors;
                    console.log(this.errors)
                }
                loading.close()
            }).catch(error=>{
                console.log(error);
                loading.close()
            })
        },
        addTeam(){
            const data = {
                name:this.team,
                game:localStorage.getItem("game_id"),
                token:this.$store.state.token,
                user_id:this.$store.state.user_id
            }
            this.axios.post("/add-team", data).then((response)=>{
                response = response.data;
                console.log(response)
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    this.$store.commit("SET_ADD_TEAMS", response.teams);
                    this.team = ""
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        addTeamPlayer() {
            let data = {
                team_id:this.z,
                player_id:localStorage.getItem("game_id"),
                token:this.$store.state.token,
                user_id:this.$store.state.user_id
            }
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
        openCreate() {
            this.create = true;
        }
    },
    beforeMount(){
        const loading = this.$vs.loading()
        this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
        const credentials = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            game_id:localStorage.getItem("game_id")
        }
       this.axios.get('/add-game', { params:credentials }).then((response) => {
        response = response.data;
        this.teams = response.teams;
        loading.close()
        // console.log(response)   
      })
    },
    watch:{
        // team(){
        //     alert(this.team)
        // },
        "$store.state.add_game":function(){
            if(this.$store.state.add_game.name) {
                this.game.name = this.$store.state.add_game.name;
                this.game.time.start = this.$store.state.add_game.time.start;
                this.game.time.end = this.$store.state.add_game.time.end;
                this.game.stadium_id = this.$store.state.add_game.stadium_id;
                // this.stadiums
                // this.teams = [...this.$store.state.add_game.teams]
                console.log(this.teams)
                this.game.price = this.$store.state.add_game.price;
                this.game.max_players = this.$store.state.add_game.max_players;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-game-add {
    padding: 2rem;

    &__title {
        font-family: $font-semibold;
    }

    &__input {
        margin: 1.5rem;
    }

    &__time {
        display: flex;
        flex-direction: column;
        justify-content: start;

        &-el {
            width: 100%;
            margin-left: .5rem;
            margin-top: 1.5rem!important;
        }
    }
}

.input-top {
    margin-top: 0px;
}

.err-template {
    font-size: .7rem;
    display: block;
    margin-left: .6rem;
    color: #ff5a68;
}
</style>