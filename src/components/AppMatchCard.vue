<template>
    <div class="app-match">
        <md-card class="md-card-stats">
            <div class="match-card">
                <div class="match-card__team">
                    <span class="match-card__team-name">{{team1.name}}</span>
                    <ul v-if="extend">
                        <li v-for="(p, index) in players1" :key="index">Florin Bucataru</li>
                    </ul>
                </div>
                <div class="match-card__score">
                    <span v-if="status=='waiting'">vs</span>
                    <span v-else>{{team1.stats.gm}} - {{team2.stats.gm}}</span>
                </div>
                <div class="match-card__team">
                    <span class="match-card__team-name">{{team2.name}}</span>
                    <ul v-if="extend">
                        <li v-for="(p, index) in players2" :key="index">Florin Bucataru</li>
                    </ul> 
                </div>
            </div>
            <!-- <md-card-header >
            x
            </md-card-header>

            <md-card-content>
            x
            </md-card-content>

            <md-card-actions md-alignment="left">
            x
            </md-card-actions> -->
        </md-card>
        <div class="app-match__extend" @click="extendCard">
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
            players2:[]
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