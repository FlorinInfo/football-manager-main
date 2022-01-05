<template>
    <div class="app-live-match" v-if="live">
        <div class="app-live-match__general">
            <div class="app-live-match__top">
                <span>{{live.top.game.name}} &nbsp; <i class='bx bxs-trophy'></i></span>
                <span><i class='bx bxs-map-pin' ></i> &nbsp; {{live.top.stadium.name}}</span>
            </div>
            <div class="app-live-match__center">
                <div class="app-live-match__center-templates">
                    <div class="app-live-match__center-template">
                        <img src="../assets/images/club.png" alt="">
                        <div class="app-live-match__center-template-name" v-if="live.top.game.live">
                            {{live.top.game.live.team1.name}}
                        </div>
                        <div class="app-live-match__center-template-name" v-else>
                           ???
                        </div>
                        <!-- <ul>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        </ul> -->
                    </div>
                    <div class="app-live-match__center-templates-center" v-if="live.top.game.live">
                        <div class="app-live-match__center-templates-center-score">
                            {{live.top.game.live.team1.stats.gm}}
                            - 
                            {{live.top.game.live.team2.stats.gm}}
                        </div>
                        <span 
                            @click="finishMatch"
                            class="app-live-match__center-templates-center-status">
                            <i class='bx bx-play' ></i> &nbsp;Finalizeaza
                        </span>
                        <!-- <span class="app-live-match__center-templates-center-status"><i class='bx bx-play' ></i> &nbsp;10:00</span> -->
                        <!-- <span class="app-live-match__center-templates-center-timer">09:35</span> -->
                    </div>
                    <div class="app-live-match__center-template">
                        <img src="../assets/images/club.png" alt="">
                        <div class="app-live-match__center-template-name" v-if="live.top.game.live">
                            {{live.top.game.live.team2.name}}
                        </div>
                        <div class="app-live-match__center-template-name" v-else>
                            ???
                        </div>
                        <!-- <ul>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        </ul> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="app-live-match__stats">
            <div class="app-live-match__stats-bar">
                <div 
                    class="app-live-match__stats-bar-element" 
                    :class="{'app-live-match__stats-bar-element--active':activeSection==0}"
                    @click="changeSection(0)"
                >
                    <span>Live</span>
                </div>
                <div 
                    class="app-live-match__stats-bar-element" 
                    :class="{'app-live-match__stats-bar-element--active':activeSection==1}"
                    @click="changeSection(1)"
                >
                    <span>Meciuri</span>
                </div>
                <div 
                    class="app-live-match__stats-bar-element" 
                    :class="{'app-live-match__stats-bar-element--active':activeSection==2}"
                    @click="changeSection(2)"
                >
                    <span>Clasament</span>
                </div >
                <div 
                    class="app-live-match__stats-bar-element" 
                    :class="{'app-live-match__stats-bar-element--active':activeSection==3}"
                    @click="changeSection(3)"
                >
                    <span>Jucatori</span>
                </div>
            </div>
            <div class="app-live-match__stats-content">
                <Stadium 
                    v-if="activeSection==0&&live.team1&&live.team2" 
                    :team1="live.team1" 
                    :team2="live.team2" 
                    style="margin-top:1rem;"
                    @openGoalModal="openGoalModal"/>
                <div v-if="activeSection==1" style="margin-top:.5rem;">
                    <vs-button
                    v-if="live.teams.length"
                    gradient
                    style="min-width: 100px;margin-left:auto;"
                    @click="matchDialog=true"
                    animation-type="scale"
                    >
                    <i class='bx bxs-add-to-queue'></i>
                    <template #animate >
                    Adauga meci
                    </template>
                </vs-button>
                <span v-else class="no-teams">Nu poti adauga meciuri!(nu au fost adaugate echipele)</span>
                    <div v-if="live.matches">
                        <AppMatch 
                        v-for="m in live.matches.filter(match=>match.status!='played')" 
                        :team1="m.team1" 
                        :team2="m.team2"
                        :status="m.status"
                        :key="m.id" 
                        style="margin-top:1rem;"/>
                    <AppMatch 
                        v-for="m in live.matches.filter(match=>match.status=='played')" 
                        :team1="m.team1" 
                        :team2="m.team2"
                        :status="m.status"
                        :key="m.id" 
                        style="margin-top:1rem;"/>
                    </div>
                </div>
                <vs-table v-if="activeSection==2">
                    <template #thead>
                    <vs-tr>
                        <vs-th>
                        Echipa
                        </vs-th>
                        <vs-th>
                        MJ
                        </vs-th>
                        <vs-th>
                        V
                        </vs-th>
                        <vs-th>
                        E
                        </vs-th>
                        <vs-th>
                        I
                        </vs-th>
                        <vs-th>
                        GM
                        </vs-th>
                        <vs-th>
                        GP
                        </vs-th>
                        <vs-th>
                        PCT
                        </vs-th>
                    </vs-tr>
                    </template>
                    <template #tbody>
                    <vs-tr
                        style="margin-top:5px;"
                        :key="i"
                        v-for="(tr, i) in live.teams"
                        :data="tr"
                    >
                        <vs-td 
                        
                        :class="{'final-secondary-border':i==2|| i==3,'final-border':i==1||i==0}">
                         {{tr.name}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.matches}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.wins}} 
                        </vs-td>
                        <vs-td>
                         {{tr.stats.eq}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.loses}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.gm}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.gp}}
                        </vs-td>
                        <vs-td>
                         {{tr.stats.wins*3 + tr.stats.eq * 1}}
                        </vs-td>
                    </vs-tr>
                    </template>
                </vs-table>
                <vs-table v-if="activeSection==3" striped>
                    <template #thead>
                    <vs-tr>
                        <vs-th>
                        Nr.
                        </vs-th>
                        <vs-th>
                        Jucatori
                        </vs-th>
                        <vs-th>
                        Echipa
                        </vs-th>
                        <vs-th>
                        Goluri
                        </vs-th>
                        <vs-th>
                        Autogoluri
                        </vs-th>
                    </vs-tr>
                    </template>
                    <template #tbody>
                    <vs-tr
                        style="margin-top:5px;"
                        :key="i"
                        v-for="(tr, i) in live.players"
                        :data="tr"
                    >
                        <vs-td  >
                         {{i+1}}.
                        </vs-td>
                        <vs-td>
                         {{tr.player_id.first_name}} {{tr.player_id.second_name}}
                        </vs-td>
                        <vs-td> 
                         <span v-if="tr.team_id">{{tr.team_id.name}}</span>
                        </vs-td>
                        <vs-td>
                         <i class='bx bx-football' v-for="x in tr.goals" :key="x"></i>
                        </vs-td>
                        <vs-td>
                         <i class='bx bx-football' v-for="x in tr.autogoals" :key="x"></i>
                        </vs-td>
                    </vs-tr>
                    </template>
                </vs-table>
            </div>
        </div>

        <!-- Modals -->
        <vs-dialog overflow-hidden :loading="loadMatches" v-model="matchDialog">
            <template #header>
            <h4 class="not-margin">
                Adauga <b>meciuri</b>
            </h4>
            </template>
            <div class="add-match__template" v-for="(t, index) in templateAdd" :key="index">
                <div class="add-match__template-top">
                    <span class="add-match__template-title">
                        Meci {{index + 1}} 
                        <span v-if="t.match_type==3">(simplu)</span>
                        <span v-if="t.match_type==2">(finala mica)</span>
                        <span v-if="t.match_type==1">(finala mare)</span>
                    </span>
                    <i class='bx bx-sort-alt-2' @click="changeMatchType(index)"></i>
                    <!-- <i  v-if="t.team1&&t.team2"
                        class='bx bx-trash add-match__template-delete' 
                        @click="removeMatch(index)"
                    >
                    </i> -->
                    <!-- <div class="add-match__template-type"> -->
                        <!-- <vs-checkbox val="1" v-model="option">
                            Finala mare
                        </vs-checkbox>
                        <vs-checkbox val="2" v-model="option">
                            Finala mica
                        </vs-checkbox> -->
                    <!-- </div> -->
                </div>
                        <div class="add-match__template-teams">
                        <div>
                            <vs-select
                                filter
                                placeholder="Echipa 1"
                                v-model="t.team1"
                                :key="live.teams.length"
                            >
                                <vs-option :label="t.name" :value="t._id" v-for="(t) in live.teams" :key="t._id">
                                {{t.name}}
                                </vs-option>
                            </vs-select>  
                        </div>
                        <div > 
                            <vs-select
                                    style="margin-left:auto;"
                                    filter
                                    placeholder="Echipa 2"
                                    v-model="t.team2"
                                    :key="live.teams.length"
                                >
                                <vs-option :label="t.name" :value="t._id" v-for="(t) in live.teams" :key="t._id">
                                    {{t.name}}
                                </vs-option>
                            </vs-select>  
                        </div>
                    </div>
            </div>
            <vs-button style="margin:1rem auto 0 auto;" @click="addMatches">
                Adauga
            </vs-button>
        </vs-dialog>

         <vs-dialog  v-model="goal_modal" v-if="goal_modal">
        <template #header>
          <h4 class="not-margin">
            Adauga (sterge) gol / autogol
          </h4>
        </template>
            <MdButton
            class="goal-dialog-btn md-raised md-primary"
            style="width:100%" 
            @click="addGoal(1)"
                >
            Adauga gol
        </MdButton>
        <MdButton
        class="goal-dialog-btn md-raised md-primary"
        style="width:100%"
        @click="addGoal(2)"
            >
        Adauga autogol
        </MdButton>
        <MdButton
            v-if="goal_stats.player_id.goals>0"
            class="goal-dialog-btn md-raised md-accent"
            style="width:100%"
            @click="deleteGoal(1)"
        >
        Sterge gol
      </MdButton>
        <MdButton
            v-if="goal_stats.player_id.autogoals>0"
            class="goal-dialog-btn md-raised md-accent"
            style="width:100%"
            @click="deleteGoal(2)"
        >
        Sterge  autogol
      </MdButton>
      stadium_id: {{live.top.stadium.id}}
      <br> 
    player_id: {{goal_stats.player_id._id}}   
      <br> 
      team_1:{{live.top.game.live.team1._id}}
      <br>
    team_2:{{live.top.game.live.team2._id}}
      <br>  
      game_id: {{live.top.game.id}}
        <!-- {{goal_stats}} -->
      </vs-dialog>
    </div>
</template>

<script>
import AppMatch from "../components/AppMatch.vue";
import Stadium from "../components/Stadium.vue"
export default {
    components:{
        AppMatch,
        Stadium
    },
    props:{
        live:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            activeSection:0,
            matchDialog:false,
            option:1,
            value:"",
            loadMatches:false,
            templateAdd:[
                {
                    team1:"",
                    team2:"",
                    match_type:3
                }
            ],
            goal_modal:false,
            goal_stats:null
        }
    },
    computed: {
        team1() {
            return this.templateAdd.map(match => match.team1)
        },
        team2() {
            return this.templateAdd.map(match => match.team2)
        }
    },
    methods:{
        openGoalModal(stats){
            this.goal_modal = true;
            this.goal_stats = stats;
        },
        finishMatch(){
            let data = {
                team1:{
                    id:this.live.top.game.live.team1._id,
                    gm:this.live.top.game.live.team1.stats.gm
                },
                team2:{
                    id:this.live.top.game.live.team2._id,
                    gm:this.live.top.game.live.team2.stats.gm
                },
                match_id:this.live.top.game.live._id,
            }
            this.axios.post('/finish-match',data).then((response) => { 
            response = response.data;
            this.$emit('reload')
            // this.$store.commit("SET_AUTH",response.logged); 
            console.log(response)
        })
        },
        addGoal(goal_type){
        let data = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            stadium_id:this.live.top.stadium.id,
            player_id:this.goal_stats.player_id._id,
            team_1:this.live.top.game.live.team1._id,
            team_2:this.live.top.game.live.team2._id,
            game_id:this.live.top.game.id,
            match:this.live.top.game.live._id,
            goal_type
        }
        this.axios.post('/add-goal',data).then((response) => { 
            response = response.data;
            this.$store.commit("SET_AUTH",response.logged); 
            if(response.status) {
                let text = 'Golul';
                if(goal_type==2) text = 'Autogolul';
                this.$vs.notification({
                    progress: 'auto',
                    color:"success",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: text + ' a fost adaugat cu succes'
                })
                this.goal_modal = false;
                this.goal_stats = null;
                this.$emit('reload')
            }
        })
        console.log(data);  
    //               stadium_id: {{live.top.stadium.id}}
    //   <br> 
    // player_id: {{goal_stats.player_id._id}}   
    //   <br> 
    //   team_1:{{live.top.game.live.team1._id}}
    //   <br>
    // team_2:{{live.top.game.live.team2._id}}
    //   <br>  
    //   game_id: {{live.top.game.id}}
        },
        deleteGoal(goal_type){
        let data = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            stadium_id:this.live.top.stadium.id,
            player_id:this.goal_stats.player_id._id,
            team_1:this.live.top.game.live.team1._id,
            team_2:this.live.top.game.live.team2._id,
            game_id:this.live.top.game.id,
            match:this.live.top.game.live._id,
            goal_type
        }
        console.log(data)
        this.axios.delete('/delete-goal',{data:data}).then((response) => { 
            console.log(response);
            response = response.data;
            // this.$store.commit("SET_AUTH",response.logged); 
            if(response.status) {
                let text = 'Golul';
                if(goal_type==2) text = 'Autogolul';
                this.$vs.notification({
                    progress: 'auto',
                    color:"success",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: text + ' a fost sters cu succes'
                })
                this.goal_modal = false;
                this.goal_stats = null;
                this.$emit('reload')
            }
        })
        console.log(data);  
        },

        changeSection(id) {
            this.activeSection = id;
        },
        removeMatch(index) {
            alert(index)
            let arr = [...this.templateAdd];
            arr.splice(index,1);
            this.templateAdd = [...arr];
            console.log(this.templateAdd);
            this.matchDialog = true;
            console.log(this.matchDialog)
        },
        changeMatchType(index) {
            if(this.templateAdd[index].match_type===1)  {this.templateAdd[index].match_type=2; return 0;}
            if(this.templateAdd[index].match_type==2)   {this.templateAdd[index].match_type=3; return 0;}
            if(this.templateAdd[index].match_type==3)   {this.templateAdd[index].match_type=1; return 0;}
        },
        addMatches() {
            this.loadMatches = true;
            let data = {
                matches:[...this.templateAdd.slice(0, -1)],
                stadium_id :this.live.top.stadium.id,
                game_id : this.live.top.game.id
            }
            console.log(data);
            this.axios.post('/add-match',data).then((response) => {
                this.loadMatches = this.matchDialog = false;
                // this.live.matches.push(data.matches); 
                if(response.data.succes) this.$emit('reload');
                console.log(response)
            })
        }
    },
    watch:{
        team1() {
            if( this.templateAdd[this.templateAdd.length-1].team1&&
                this.templateAdd[this.templateAdd.length-1].team2
            ){
                this.templateAdd.push({
                    team1:"",
                    team2:"",
                    match_type:3
                })
            }
        },
        team2() {
            if( this.templateAdd[this.templateAdd.length-1].team1&&
                this.templateAdd[this.templateAdd.length-1].team2
            ){
                this.templateAdd.push({
                    team1:"",
                    team2:"",
                    match_type:3
                })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.app-live-match {
    display: block;

    &__general {
        background-image: linear-gradient(rgb(0, 0, 0), rgba(2, 2, 2, 0.397)),url("../assets/images/live-match.jpg");
        background-position: bottom;
        background-size: 100%;
        width:100%;
        min-height:200px; 
        padding: 2rem;
        box-sizing: border-box;
    }

    &__top {
        color: white;
        display: flex;
        justify-content: center;
        border-bottom: .5px solid rgba(255, 255, 255, 0.198);
        margin: 0 auto;
        padding-bottom: 1rem;

        span {
            font-family: $font-light; 
            font-size: 1.2rem;
            
            &:first-child{
                margin-right: 5rem;
            }

            &:nth-child(2) {
                margin-left: 5rem;
            }

            i {
                transform: translateY(2px);
            }
        }
    }

    &__center {
        color: white;
        margin-top:4rem;

        &-templates {
            display: flex; 
            justify-content: center;
            margin: 0 auto;

            &-center {
                display: flex;
                flex-direction: column; 
                padding: 0 4rem;

                &-score {
                    margin: 0 auto;
                    display: block;
                    font-size: 1.7rem;
                    font-family: $font-semibold;
                }

                &-status {
                    display: block;
                    padding: .5rem 3rem;
                    background: white; 
                    color: black;
                    font-family: $font-medium;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-top: 2rem;
                }

                &-timer {
                    display: block;
                    text-align: center;
                    font-family: $font-semibold;
                    margin-top: 2rem;
                    font-size: 1.5rem;
                    letter-spacing: 2px;
                }
            }
        }

        &-template {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 200px;

            img {
                width: 80px;
                display: block;
                margin: 0 auto;
            }

            &-name {
                display: block;
                margin: 0 auto;
                font-family: $font-medium;
                font-size: 1.7rem;
                margin-top: 10px;
            }

            ul {
                margin: 0 auto;
                list-style: none;
                font-family: $font-medium;
                margin-top: 1rem;

                li {
                    padding: .5rem 0;
                    font-size: 1rem;
                    display: flex;
                    cursor: pointer; 

                    span {
                        display: block;
                        margin: auto;
                        margin-left: 5px;
                    }

                    img {
                        width: 25px;
                    }
                }
            }
        }
    }

    &__stats {
        width: 800px;
        max-width: 800px;
        margin: 0 auto;

        &-bar {
            width: 100%;
            display: flex;
            justify-content: space-between;

            &-element {
                width: 25%;
                text-align: center;
                font-family: $font-medium;
                padding: 1.3rem 0;
                border-bottom: 1px solid rgb(167, 167, 167);
                color: rgb(167, 167, 167);
                cursor: pointer;
                // transition: all .5s;

                &--active {
                    border-bottom: 2px solid blue;;
                    color: blue;
                    font-family: $font-semibold;
                    transition: 0;

                    &:hover {
                        border-bottom: 2px solid blue!important;;
                        color: blue!important;
                        font-family: $font-semibold;
                        transition: 0; 
                    }
                }

                &:hover {
                    border-bottom: 1px solid rgb(87, 87, 255);;
                    color: rgb(128, 128, 255);
                    font-family: $font-semibold;
                }
            }
        }
    }
}

.final-border {
    border-left: 6px solid blue!important;
}

.final-secondary-border {
    border-left: 6px solid orangered!important;
}

.add-match__template {
    display: block; 
    margin-top: 1.5rem;
    border-bottom: 1px solid rgb(200, 200, 200);
    padding-bottom: 10px;


    &-title {
        font-family: $font-medium;

    }

    &-delete {
        display: block;
        color: red;
        cursor: pointer;
        transform: translateY(10px);
    }

    &-top {
        display: flex;
        justify-content: space-between;
    }

    &-teams {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: .4rem;

        div {
            width: 80%;
        }
    }
}

.no-teams {
    display: block;
    text-align: center;
    font-family: $font-light;
}

.goal-dialog-btn {
    &:first-child {
        margin: 0;
    }
    &:not(:first-child) {
        margin-top: .5rem;
    }
}
</style>