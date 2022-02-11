<template>
    <div class="app-match">
        <md-card class="md-card-stats">
            <div class="match-card">
                <div class="match-card__team">
                    <span class="match-card__team-name">{{team1.name}}</span>
                    <ul v-if="extend">
                        <li style="display:flex;" v-for="(p, index) in players1" :key="index">
            <span style="display:block;margin:auto 0;">{{p.player_id.first_name}} {{p.player_id.second_name}}</span>     
            <md-button @click="openGoalDialog(p.player_id._id)" style="margin-left:10px;" class="md-icon-button md-dense md-raised md-primary">
                <md-icon>add</md-icon>
            </md-button>
                        </li>
                    </ul>
                </div>
                <div class="match-card__score">
                    <span v-if="status=='waiting'">vs</span>
                    <span v-else>{{team1.stats.gm}} - {{team2.stats.gm}}</span>
                </div>
                <div class="match-card__team">
                    <span class="match-card__team-name">{{team2.name}}</span>
                    <ul v-if="extend">
                        <li style="display:flex;" v-for="(p, index) in players2" :key="index">
            <span style="display:block;margin:auto 0;">{{p.player_id.first_name}} {{p.player_id.second_name}}</span>     
            <md-button @click="openGoalDialog(p.player_id._id)" style="margin-left:10px;" class="md-icon-button md-dense md-raised md-primary">
                <md-icon>add</md-icon>
            </md-button>
                        </li>
                    </ul> 
                </div>
            </div>
            <div class="md-layout-item md-size-100 text-right" v-if="extented">
                <md-button class="md-raised md-danger" @click="active=true">Finalizare meci</md-button>
            </div> 
            <md-dialog-confirm
                style="z-index:100000;" 
                :md-active.sync="active"
                md-title="Esti sigur ca doresti sa finalizezi meciul?"
                md-confirm-text="Confirma"
                md-cancel-text="Renunta"
                @md-cancel="onCancel"
                @md-confirm="onConfirm" />
                <md-dialog :md-active.sync="showDialogGoal" style="z-index:10000;" >
                    <div style="width:400px;"></div>
                    <div class="md-layout" style="padding:20px 0; ">
                        <div class="md-layout-item md-size-50 text-center">
                            <md-button class="md-raised md-success" @click="addGoal(1)">Adauga gol</md-button>
                        </div> 
                        <div class="md-layout-item md-size-50 text-center">
                            <md-button class="md-raised md-warning" @click="addGoal(2)">Adauga autogol</md-button>
                        </div> 
                        <div class="md-layout-item md-size-50 text-center">
                            <md-button class="md-raised md-danger" @click="deleteGoal(1)">Sterge gol</md-button>
                        </div> 
                        <div class="md-layout-item md-size-50 text-center">
                            <md-button class="md-raised md-danger" @click="deleteGoal(2)">Sterge autogol</md-button>
                        </div> 
                    </div>
                </md-dialog>
        </md-card>
        <div class="app-match__extend" @click="extendCard" v-if="!extented">
            <md-icon style="color:white;" v-if="!extend">arrow_circle_down</md-icon>
            <md-icon style="color:white;" v-else>arrow_circle_up</md-icon>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        match_id:{},
        team1:{
            type:Object,
            default:()=>{}
        },
        team2:{
            type:Object,
            default:()=>{}
        },
        status:{
            type:String
        },
        extented:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            extend:this.extented,
            players1:[],
            players2:[],
            active: false,
            value:false,
            showDialogGoal:false,
            player_id:null
        }
    },
    methods:{
        async extendCard() {
            if(!this.extend){
                const credentials = {
                    user_id:this.$store.state.user_id,
                    token:this.$store.state.token,
                    match_id:this.match_id,
                    id_team1:this.team1._id,
                    id_team2:this.team2._id,
                }
                console.log(credentials);
                this.axios.get('/get-match-players', { params:credentials }).then((response) => {
                    response = response.data;
                    this.extend = !this.extend;
                    this.players1 = response.team1.players;
                    this.players2 = response.team2.players; 
                    console.log(response);
                })
            }
            else {
                this.extend = false;
            }
        },
        addGoal(goal_type){
            this.$emit("addGoal", goal_type, this.player_id);
            this.showDialogGoal = false;
        },
        deleteGoal(goal_type){
            this.$emit("deleteGoal", goal_type, this.player_id);
            this.showDialogGoal = false;
        },
        openGoalDialog(id) {
            console.log(id)
            this.showDialogGoal = true;
            this.player_id = id;
        },
        onConfirm () {
        this.value = true;
        this.$emit("finishMatch");
        },
        onCancel () {
        this.value = false;
        }
    },
    beforeMount(){
        if(this.extented) {
            this.extend = false;
            this.extendCard();
        }
    }
}
</script>

<style lang="scss" scoped>
.app-match {
    width: 99%;
    margin: 0 auto;
    position: relative;

    &__extend {
        position: absolute;
        bottom: 16px;
        z-index: 10000;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgb(131, 131, 131);
        color: white;
        border-radius: 50%;
        cursor: pointer;
    }
}

.match-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
    box-sizing: border-box;

    &__team {
        display: flex;
        flex-direction: column;

        &-name {
            font-size: 1.2rem;
        }

        ul {
            margin-top: 20px;
            list-style: none;

            li {
                padding: 1rem 0;
                cursor: pointer;
            }
        }
    }

    &__score {
        font-size: 1.3rem;
    }
}
</style>