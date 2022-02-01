<template>
    <div class="app-game" v-if="live">
    <div class="app-game__sections">
        <span 
            :class="{'app-game__sections--active':activeSection==0}" 
            @click="changeSection(0)"
        >
            Live
        </span>
        <span 
            :class="{'app-game__sections--active':activeSection==1}" 
            @click="changeSection(1)"
        >
            Meciuri
        </span>
        <span 
            :class="{'app-game__sections--active':activeSection==2}"
            @click="changeSection(2)"
        >
            Clasament
        </span>
        <span 
            :class="{'app-game__sections--active':activeSection==3}" 
            @click="changeSection(3)"
        >
            Jucatori
        </span>
    </div>
    <div class="app-game__section app-game__section--1" v-if="activeSection==1">
        <AppMatchCard
            v-for="m in live.matches.filter(match=>match.status!='played')" 
            :key="m.id"
            :team1="m.team1" 
            :team2="m.team2"
            :status="m.status"
        />
        <AppMatchCard
            v-for="m in live.matches.filter(match=>match.status=='played')" 
            :key="m.id"
            :team1="m.team1" 
            :team2="m.team2"
            :status="m.status"
        />
    </div>
    <div class="app-game__section app-game__section--2" v-if="activeSection==2">
        <div v-if="live.teams.length==0" style="text-align:center;">
            <h5>Nu au fost create echipe momentan</h5>
        </div>
        <md-card v-else>
          <md-card-header data-background-color="green">
            <h4 class="title">Clasament echipe</h4> 
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
        <!-- {{live.players}} -->
                <md-table v-model="live.teams" table-header-color="green">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Nume Echipa">
                            {{ item.name }} 
                        </md-table-cell>
                        <md-table-cell md-label="Meciuri jucate">
                            {{ item.stats.matches }} 
                        </md-table-cell>
                        <md-table-cell md-label="Castiguri">
                            {{ item.stats.wins }} 
                        </md-table-cell>
                        <md-table-cell md-label="Egaluri">
                            {{ item.stats.eq }} 
                        </md-table-cell>
                        <md-table-cell md-label="Pierderi">
                            {{ item.stats.loses }} 
                        </md-table-cell> 
                        <md-table-cell md-label="Goluri Marcate">
                            {{ item.stats.gm }} 
                        </md-table-cell>
                        <md-table-cell md-label="Goluri Primite">
                            {{ item.stats.gp }} 
                        </md-table-cell>
                        <md-table-cell md-label="Puncte">
                            {{ item.stats.wins*3 + item.stats.eq }} 
                        </md-table-cell>
                        <!-- <md-table-cell md-label="Echipa">{{item.team_id.name}}</md-table-cell>
                        <md-table-cell md-label="Goluri">{{item.goals}}</md-table-cell>
                        <md-table-cell md-label="Autogoluri">{{item.autogoals}}</md-table-cell> -->
                    </md-table-row>
                </md-table>
            </md-card-content>
        </md-card>
    </div>
    <div class="app-game__section app-game__section--3" v-if="activeSection==3">
        <md-card >
          <md-card-header data-background-color="green">
            <h4 class="title">Statistica jucatori</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
        <!-- {{live.players}} -->
                <md-table v-model="live.players" table-header-color="green">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Nume Prenume">
                            {{ item.player_id.first_name }} {{item.player_id.second_name}}
                        </md-table-cell> 
                        <md-table-cell md-label="Echipa" >{{item.team_id ? item.team_id.name : '---'}}</md-table-cell>
                        <md-table-cell md-label="Goluri">{{item.goals}}</md-table-cell>
                        <md-table-cell md-label="Autogoluri">{{item.autogoals}}</md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card-content>
        </md-card>
    </div>
    </div>
</template>


<script>
// import {
//   StatsCard,
// } from "@/components";
import AppMatchCard from "../components/AppMatchCard.vue";
export default {
    components:{
        AppMatchCard
    },
    data(){
        return {
            game:null,
            live:null,
            game_status:0,
            loading:true,
            activeSection:1, 
        }
    },
    methods:{
        changeSection(id) {
            this.activeSection = id;
        },
        registerToGame(id) {
            let data = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:id
            }
            console.log(id)
            this.loading = this.$vs.loading()
            this.axios.post('/register-to-game',data).then((response) => {
            // this.loading.close()
                if(response.data.status){
                // this.$vs.notification({
                //     progress: 'auto',
                //     color:"success",
                //     position:"top-right",
                //     title: 'Super, super! 😎',
                //     text: 'Te-ai inscris cu succes la campionat.Bafta bossulica! '
                // })
                // alert(1)
                localStorage.setItem("game_id",id);  
                this.loadPage();
            }
            else {
                // this.$vs.notification({
                //     progress: 'auto',
                //     color:"danger",
                //     position:"top-right",
                //     title: 'Sorry, sorry! 🤨',
                //     text: 'Te-ai inscris deja la acest campionat bossulica... '
                // })
            }
            })
        },
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
        loadPage() {
            // this.loading = this.$vs.loading()
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:this.$route.params.id
            }
            this.axios.get('/get-live', { params:credentials }).then((response) => {
                response = response.data;
                this.live = response.data;
                // this.game_status = response.data.game_status;
                this.$store.commit("SET_AUTH",response.logged); 
                // this.loading.close()
                console.log("xxx",response)   
            })
        }
    },
    beforeMount() {
        this.loadPage();
    }
}
</script>

<style lang="scss" scoped>
.app-game {

    &__sections {
        max-width: 450px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding:0 0 2rem 0 ;

        span {
            font-size: 1.2rem;
            display: block;
            cursor: pointer;
            padding: 10px 20px;
        }

        &--active {
            background: linear-gradient(60deg, #66bb6a, #43a047) !important;
            color: #fff;
        }
    }
}

</style>