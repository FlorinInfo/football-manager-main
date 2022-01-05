<template>
    <div class="app-stadium">
        <img src="../assets/images/field.jpg" class="app-stadium__field" alt="">
        <div 
            class="app-stadium__player " 
            :class="`app-stadium__player-${index+1}`"
            v-for="(t, index) in team1"
            :key="index"
            @click="$emit('openGoalModal',t)">
            <img src="../assets/images/red-tshirt.png" alt="team-1">
            <span v-if="t">{{t.player_id.first_name}}</span>
            <span v-else>???</span>
            <div class="app-stadium__player--goals" v-if="t.player_id.goals">
                <img src="../assets/images/football-ball.png" alt="">
                <div class="app-stadium__player--goals-nr" v-if="t.player_id.goals>1">
                    <p>{{t.player_id.goals}}</p>
                </div>
            </div>
        </div>
        <div 
            v-for="(t, index) in team2" 
            :key="index"
            :class="`app-stadium__player-${index+7}`"
            class="app-stadium__player " 
            @click="$emit('openGoalModal',t)">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="t">{{t.player_id.first_name}}</span>
            <span v-else>???</span>
            <div class="app-stadium__player--goals" v-if="t.player_id.goals">
                <img src="../assets/images/football-ball.png" alt="">
                <div class="app-stadium__player--goals-nr" v-if="t.player_id.goals>1">
                    <p>{{t.player_id.goals}}</p>
                </div>
            </div>
        </div>
        <!-- <div class="app-stadium__player app-stadium__player-1" @click="$emit('openGoalModal',team1[0])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[0]">{{team1[0].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-2" @click="$emit('openGoalModal',team1[2])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[1]">{{team1[1].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-3" @click="$emit('openGoalModal',team1[2])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[2]">{{team1[2].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-4" @click="$emit('openGoalModal',team1[3])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[3]">{{team1[3].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-5" @click="$emit('openGoalModal',team1[4])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[4]">{{team1[4].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-6" @click="$emit('openGoalModal',team1[5])">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span v-if="team1[5]">{{team1[5].player_id.first_name}}</span>
            <span v-else>???</span>
        </div> -->
        <!-- <div class="app-stadium__player app-stadium__player-7" @click="$emit('openGoalModal',team2[0])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[0]">{{team2[0].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-8" @click="$emit('openGoalModal',team2[1])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[1]">{{team2[1].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-9" @click="$emit('openGoalModal',team2[2])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[2]">{{team2[2].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-10" @click="$emit('openGoalModal',team2[3])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[3]">{{team2[3].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-11" @click="$emit('openGoalModal',team2[4])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[4]">{{team2[4].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>
        <div class="app-stadium__player app-stadium__player-12" @click="$emit('openGoalModal',team2[5])">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span v-if="team2[5]">{{team2[5].player_id.first_name}}</span>
            <span v-else>???</span>
        </div>  -->
    </div>
</template>

<script>
export default {
    computed:{
        getClass(index) {
            return 'app-stadium__player-' + index;
        }
    },
    props:{
        team1:{
            type:Array,
            default:()=>{return []}
        },
        team2:{
            type:Array,
            default:()=>{return []}
        }
    }
}
</script>


<style lang="scss" scoped>
.app-stadium {
    width: 100%;
    position: relative;
    

    &__field {
        position: relative;
    }

    &__player {
        position: absolute;
        top: 0;
        cursor: pointer;

        &--goals {
            position: absolute;
            top: -5px;

            img {
                width: 16px!important;
                position: relative; 
            }

            &-nr {
                position: absolute;
                top: 10px;
                left: 6px;
                background-color: white;
                width: 15px;
                height: 15px;
                display: flex;
                justify-content: center;
                align-content: center;
                border-radius: 10px;
                box-sizing: border-box;
                box-shadow: 0 0 0 2px rgb(0, 0, 0);

                p {
                    display: block;
                    font-family: $font-bold!important;  
                    transform: translateY(-2px);  
                }
            }
        }

        img {
            width: 50px;
            border-radius: 50%;
            position: relative;
        }

        span {
            display: block;
            text-align: center;
            color: black;
            font-family: $font-bold;
        }

        &-1 {
            top: 50%;
            transform: translateY(-50%);
            left: 10%;
        }

        &-2 {
            top: 20%;
            transform: translateY(-50%);
            left: 14%;
        }
        &-3 {
            top: 80%;
            transform: translateY(-50%);
            left: 14%;
        }
        &-4 {
            top: 50%;
            transform: translateY(-50%);
            left: 24%;
        }
        &-5 {
            top: 80%;
            transform: translateY(-50%);
            left: 40%;
        }
        &-6 {
            top: 20%;
            transform: translateY(-50%);
            left: 40%;
        }
        &-7 {
            top: 20%;
            transform: translateY(-50%);
            right: 40%;
        }
        &-8 {
            top: 80%;
            transform: translateY(-50%);
            right: 40%;
        } 
        &-9 {
            top: 50%;
            transform: translateY(-50%);
            right: 25%;
        }
        &-10 {
            top: 50%;
            transform: translateY(-50%);
            right: 10%;
        }
        &-11 {
            top: 20%;
            transform: translateY(-50%);
            right: 14%;
        }
        &-12 {
            top: 80%;
            transform: translateY(-50%);
            right: 14%;
        }
    }
}
</style>