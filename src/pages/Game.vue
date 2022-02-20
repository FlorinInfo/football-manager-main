<template>
    <div class="app-game" >
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
        <span 
            v-if="org_id==$store.state.user_id"
            @click="goLink()"
        >
            Editeaza
        </span>
    </div>
    <div class="app-game__section app-game__section--1" v-if="activeSection==0">
        <!-- {{live.top.game.live._id}}
        {{live.top.game.live.status}} -->
        <div v-if="loader" class="loader-element">
            <md-progress-spinner class="md-success" md-mode="indeterminate" ></md-progress-spinner>
        </div>
        <AppMatchCard
            v-if="liveMatch"
            @addGoal="addGoal"
            @finishMatch="finishMatch"
            @deleteGoal="deleteGoal"
            :match_id="liveMatch._id"  
            :team1="liveMatch.team1" 
            :team2="liveMatch.team2"
            :status="liveMatch.status"
            :extented="true"
            :match_type="liveMatch.match_type"
        />
        <span class="no-elements" v-if="loader==false&&!liveMatch" > Nu sunt meciuri live momentan</span>
    </div>
    <div class="app-game__section app-game__section--1" v-if="activeSection==1">
        <!-- {{live.top.game.live._id}}
        {{live.top.game.live.status}} -->
        <div v-if="loader" class="loader-element">
            <md-progress-spinner class="md-success" md-mode="indeterminate" ></md-progress-spinner>
        </div>
        <div v-if="matches&&matches.length>0">
            <!-- <div v-for="m in matches.filter(match=>match.status!='played')" :key="m._id">{{m}}</div>
            <br>
            <div v-for="m in matches.filter(match=>match.status=='played')" :key="m._id">{{m}}</div> -->
            <AppMatchCard
                @addGoal="addGoal"
                @deleteGoal="deleteGoal"
                v-for="m in matches.filter(match=>match.status!='played')" 
                :key="m._id"
                :match_id="m._id"  
                :team1="m.team1" 
                :team2="m.team2"
                :status="m.status"
                :match_type="m.match_type"
            />
            <AppMatchCard
                @addGoal="addGoal"
                @deleteGoal="deleteGoal"
                v-for="m in matches.filter(match=>match.status=='played')" 
                :key="m._id"
                :match_id="m._id" 
                :team1="m.team1" 
                :team2="m.team2"
                :status="m.status"
                :match_type="m.match_type"
            />
        </div>
        <span class="no-elements" v-if="(loader==false&&!matches)||(loader==false&&matches.length==0)" > Nu sunt meciuri momentan</span>
    </div>
    <div class="app-game__section app-game__section--1" v-if="activeSection==2">
        <!-- {{live.top.game.live._id}}
        {{live.top.game.live.status}} -->
        <div v-if="loader" class="loader-element">
            <md-progress-spinner class="md-success" md-mode="indeterminate" ></md-progress-spinner>
        </div>
        <md-card v-if="teams&&teams.length>0">
          <md-card-header data-background-color="green">
            <h4 class="title">Clasament echipe</h4> 
          </md-card-header>
          <md-card-content>
                <md-table v-model="teams" table-header-color="green">
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
        <span class="no-elements" v-if="(loader==false&&!teams)||(loader==false&&teams.length==0)" > Nu sunt echipe momentan</span>
    </div>
    <div class="app-game__section app-game__section--1" v-if="activeSection==3">
        <!-- {{live.top.game.live._id}}
        {{live.top.game.live.status}} -->
        <div v-if="loader" class="loader-element">
            <md-progress-spinner class="md-success" md-mode="indeterminate" ></md-progress-spinner>
        </div>
        <md-card v-if="players&&players.length>0"> 
            <span style="display:none;">{{players}}</span> 
          <md-card-header data-background-color="green">
            <h4 class="title">Statistica jucatori</h4>
          </md-card-header>
          <md-card-content>
                <md-table v-model="players" table-header-color="green">
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
        <span class="no-elements" v-if="loader==false&&!players"> Nu sunt jucatori momentan</span>
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
            liveMatch:null,
            players:null,
            teams:null,
            live:null,
            game_status:0,
            loading:true,
            activeSection:0, 
            matches:null,
            loader:true,
            org_id:null
        }
    },
    methods:{
        changeSection(id) {
            this.activeSection = id;
            this.loadPage();
        },
        addGoal(data){
        let dataFull = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            stadium_id:this.liveMatch.stadium_id,
            player_id:data.player_id,
            team_1:data.team1,
            team_2:data.team2,
            game_id:this.liveMatch.game_id,
            match:data.match_id,
            goal_type:data.goal_type
        }
        // console.log(dataFull)
        this.axios.post('/add-goal',dataFull).then((response) => { 
            response = response.data;
            // this.$store.commit("SET_AUTH",response.logged); 
            if(response.status) {
                // console.log(response)  
                this.loadPage();
            }
        })
        },
        deleteGoal(goal_type, player_id){
            let data = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                stadium_id:this.liveMatch.stadium_id,
                player_id,
                team_1:this.liveMatch.team1._id,
                team_2:this.liveMatch.team2._id,
                game_id:this.liveMatch.game_id,
                match:this.liveMatch._id,
                goal_type
            }
            // console.log(data)
            this.axios.delete('/delete-goal',{data:data}).then((response) => { 
                // console.log(response);
                response = response.data;
                // this.$store.commit("SET_AUTH",response.logged); 
                this.$store.commit("SET_AUTH",response.logged); 
                if(response.status) {
                    // console.log(response)
                    // let text = 'Golul';
                    // if(goal_type==2) text = 'Autogolul';
                    // this.goal_modal = false;
                    // this.goal_stats = null;
                    this.loadPage();
                }
            })
            // console.log(data);  
        },
        finishMatch(){
            let data = {
                team1:{
                    id:this.liveMatch.team1._id,
                    gm:this.liveMatch.team1.stats.gm
                },
                team2:{
                    id:this.liveMatch.team2._id,
                    gm:this.liveMatch.team2.stats.gm
                },
                match_id:this.liveMatch._id,
                match_type:this.liveMatch.match_type
            }
            // console.log(data);
            this.axios.post('/finish-match',data).then((response) => { 
                response = response.data;
                this.loadPage();
                // this.$store.commit("SET_AUTH",response.logged); 
                // console.log(response)
            })
        },
        goLink() {
            this.$router.push("/editeaza-campionat/"+this.$route.params.id);
        },
        // endGame() {
        //     const credentials = {
        //         user_id:this.$store.state.user_id,
        //         token:this.$store.state.token,
        //         game_id:this.live.top.game.id    
        //     }
        //     console.log(credentials)
        //     this.axios.post('/end-game', { params:credentials }).then((response) => {
        //         response = response.data;
        //         if(response.status) this.loadPage();  
        //     })
        // },
        loadPage() {
            this.loader = true;
            // this.loading = this.$vs.loading()
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:this.$route.params.id,
                section:this.activeSection 
            }
            this.axios.get('/get-live', { params:credentials }).then((response) => {
                response = response.data;
                this.$store.commit("SET_AUTH",response.logged); 
                // this.live = response.data;
                this.org_id = response.org_id;
                if(this.activeSection == 0)
                    this.liveMatch = response.liveMatch;
                if(this.activeSection == 1){
                    this.matches = response.matches; 
                    if(this.matches)
                        for(let index = 0; index < this.matches.length;index++) {
                            this.matches[index].team1.stats.gm = this.matches[index].gm_team1;
                            this.matches[index].team2.stats.gm = this.matches[index].gm_team2;
                        }
                }
                if(this.activeSection == 2)
                    this.teams = response.teams;
                if(this.activeSection == 3)
                    this.players = response.players;
                this.loader = false;
                // console.log(this.liveMatch)
                // this.game_status = response.data.game_status;
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
        max-width: 650px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding:0 0 2rem 0 ;
        overflow-x: auto;

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

.loader-element {
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.no-elements {
    display: block;
    text-align: center;
    font-size: 19px!important;
    padding-bottom: 20px!important;
}
</style>