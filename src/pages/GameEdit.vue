<template>
    <div class="game-edit" v-if="game">
        <md-card >
                <md-card-header data-background-color="green">
                    <h4 class="title" @click="goLink" style="cursor:pointer;">{{game.name}}</h4>
                    <!-- <p class="category">Here is a subtitle for this table</p> -->
                </md-card-header>
                <md-card-content>
                 <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Nume campionat</label>
                    <md-input v-model="game.name" type="text" disabled></md-input>
                    <md-icon>emoji_events</md-icon>  
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.name">{{errors.name}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Numar maxim de jucatori</label>
                    <md-input v-model="game.max_players" type="number" disabled></md-input>
                    <md-icon>sports_handball</md-icon> 
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.max_players">{{errors.max_players}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Pret</label>
                    <md-input v-model="game.price" type="number" disabled></md-input>
                    <md-icon>local_atm</md-icon> 
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.price">{{errors.price}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                    <label>Stadion</label> 
                    <md-input v-model="game.stadium_id.name"  disabled></md-input>

                    <!-- <md-select  name="movie" id="movie" disabled>
                        <md-option v-for="s in $store.state.add_game.stadiums"  :key="s._id" :value="s._id">{{game.stadium_id.name}}</md-option>
                    </md-select>   -->
                    <md-icon>stadium</md-icon> 
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.stadium_id">{{errors.stadium_id}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                    <label>Pret</label>
                    <VueCtkDateTimePicker disabled label="Incepe la" color="#43a047" button-color="#9c27b0" v-model="game.time.start" />
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.time">{{errors.time}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                    <label>Pret</label>
                    <VueCtkDateTimePicker disabled label="Sfarseste la" color="#43a047" button-color="#9c27b0" v-model="game.time.end" />
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.time">{{errors.time}}</span> -->
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field> 
                    <label>Nume echipa</label>
                    <md-input v-model="team_name" type="text" ></md-input>
                    <md-icon>groups</md-icon> 
                    </md-field>
                    <!-- <span class="input-error" v-if="errors&&errors.price">{{errors.price}}</span>    -->
                </div>
                <div class="md-layout-item md-size-50 text-left">
                    <md-button class="md-raised md-danger" @click="addTeam">Adauga echipa</md-button>
                </div>
                <md-table class="md-layout-item md-size-100 text-left" v-model="game.playersFull" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Nume Prenume">
                        {{ item.player_id.first_name }} 
                        {{item.player_id.second_name }}
                    </md-table-cell>
                    <md-table-cell md-label="Goluri Marcate">{{ item.player_id.stats.goals }}</md-table-cell>
                    <md-table-cell md-label="Echipa">
                        <md-field>
                    <label>Echipa</label>
                    <md-select v-model="item.team_id" name="movie" id="movie" @input="addTeamPlayer(item.player_id, item.team_id)">
                        <md-option v-for="(t) in $store.state.add_game.teams" :key="t._id" :value="t._id">{{t.name}}</md-option>
                    </md-select>  
                    <md-icon>group</md-icon> 
                    </md-field>
                        <!-- {{ item.team_id }} -->
                        </md-table-cell>
                </md-table-row>
                </md-table>
                <div class="md-layout" v-if="game.teams">
                    <div class="md-layout-item md-size-100">
                        <h4 >Adauga meciuri</h4>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field> 
                        <label>Echipa 1</label>
                        <md-select  name="movie" id="movie" v-model="templateAdd[0].team1">
                            <md-option v-for="(t) in game.teams" :key="t._id" :value="t._id">{{t.name}}</md-option>
                        </md-select>  
                        <md-icon>group</md-icon>  
                        </md-field>
                        <!-- <span class="input-error" v-if="errors&&errors.price">{{errors.price}}</span>    -->
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field> 
                        <label>Echipa 2</label>
                        <md-select  name="movie" id="movie" v-model="templateAdd[0].team2">
                            <md-option v-for="(t) in game.teams" :key="t._id" :value="t._id">{{t.name}}</md-option>
                        </md-select>  
                        <md-icon>group</md-icon>  
                        </md-field>
                        <!-- <span class="input-error" v-if="errors&&errors.price">{{errors.price}}</span>    -->
                    </div>
                    <div class="md-layout-item md-size-50 text-left">
                        <md-radio v-model="templateAdd[0].match_type" :value="3">Meci simplu</md-radio>
                        <md-radio v-model="templateAdd[0].match_type" :value="2">Semifinala</md-radio>
                        <md-radio v-model="templateAdd[0].match_type" :value="1">Finala</md-radio>
                    </div>
                    <div class="md-layout-item md-size-50 text-right">
                        <md-button class="md-raised md-danger" @click="addMatches">Adauga meci</md-button>
                    </div> 
                </div>
                <!-- {{game}} -->
                <!-- {{game.playersFull}} -->
                <!-- <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-table >
                    <md-table-row slot="md-table-row" >
                        <md-table-cell md-label="Name">x</md-table-cell>
                        <md-table-cell md-label="Country">x</md-table-cell>
                        <md-table-cell md-label="City">x</md-table-cell>
                        <md-table-cell md-label="Salary">x</md-table-cell>
                    </md-table-row>
                    </md-table>
                </div> -->
                <!-- <div class="md-layout-item md-size-100 text-right">
                    <md-button class="md-raised md-success" @click="addGame">Actualizeaza</md-button>
                </div> -->
                </div>
        </md-card-content>
        </md-card>
    </div>
</template>


<script>
export default {
    data(){
        return {
            game:null,
            live:null,
            game_status:0,
            loading:true,
            team_name:"",
            templateAdd:[
                {
                    team1:"",
                    team2:"",
                    match_type:3
                }
            ],
        }
    },
    methods:{
        endGame(game_id) {
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:game_id
            }
            this.axios.post('/end-game', { params:credentials }).then((response) => {
                response = response.data;
                if(response.status) this.loadPage();  
            })
        },
        addTeam(){
            const data = {
                name:this.team_name,
                game:this.game._id,
                token:this.$store.state.token,
                user_id:this.$store.state.user_id
            };
            this.axios.post("/add-team", data).then((response)=>{
                response = response.data;
                // console.log(response)
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    this.team_name = "";
                    this.$store.commit("SET_ADD_TEAMS", response.teams);
                    // this.$vs.notification({
                    //     progress: 'auto',
                    //     color:"success",
                    //     position:"top-right",
                    //     title: 'Super, super! 😎',
                    //     text: `Echipa ${name} a fost adaugata cu succes.`
                    // })
                    this.$store.commit("SET_D_TEAM", false);
                    this.$emit("loadTeams");
                    this.loadPage();
                    this.$notify(
                        {
                            message: 'Ai adaugat echipa cu succes',
                            icon: 'add_alert',
                            horizontalAlign: "right",
                            verticalAlign: "top",
                            type: "success"
                        })
                }
                else {
                    this.$notify(
                        {
                            message: 'Echipa nu a fost adaugata.Eroare!',
                            icon: 'add_alert',
                            horizontalAlign: "right",
                            verticalAlign: "top",
                            type: "danger"
                        })
                }

            }).catch(error=>{
                // console.log(error);
            })
        },
        goLink() {
            this.$router.push("/campionat/"+this.$route.params.id);
        },
        addTeamPlayer(id, team) {
            // console.log(team)
            let data = {
                game_id:this.game._id,
                team_id:team,
                player_id:id._id,
                token:this.$store.state.token,
                user_id:this.$store.state.user_id
            }
            // console.log(data);
            this.axios.post("/add-team-player", data).then((response)=>{
                response = response.data;
                // console.log(response)
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    // console.log(response)
                    // this.$store.commit("SET_ADD_TEAMS", response.teams);
                    // this.team = ""
                }
            }).catch(error=>{
                // console.log(error);
            })
        },
        addMatches() {
            let data = {
                matches:[...this.templateAdd],
                stadium_id :this.game.stadium_id._id,
                game_id : this.game._id
            }
            // console.log(data);
            this.axios.post('/add-match',data).then((response) => {
                this.loadMatches = this.matchDialog = false;
                // this.live.matches.push(data.matches); 
                if(response.data.succes) {
                    this.templateAdd[0].team1 = "";
                    this.templateAdd[0].team2 = "";
                    this.$notify( 
                        {
                            message: 'Meciul a fost adaugat cu succes',
                            icon: 'add_alert',
                            horizontalAlign: "right",
                            verticalAlign: "top",
                            type: "success"
                        })
                }
                else {
                    this.$notify(
                        {
                            message: 'Meciul nu a fost adaugat.Eroare!',
                            icon: 'add_alert',
                            horizontalAlign: "right",
                            verticalAlign: "top",
                            type: "danger"
                        })
                }
                // console.log(response)
            })
        },
        loadPage() {
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:this.$route.params.id
            }
            this.axios.get('/get-game', { params:credentials }).then((response) => {
                response = response.data;
                if(response.game.org_id!=this.$store.state.user_id) window.location = "/";
                // console.log(response)   
                this.game = {...response.game};
                this.$store.commit("SET_ADD_TEAMS", response.game.teams);
                
            })
        }
    },
    beforeMount() {
        this.loadPage();
    }
}
</script>

<style lang="scss" scoped>
.input-error {
    display:block;
    margin-top:-20px;
    font-size:.8rem;
    color:red;
}
</style>