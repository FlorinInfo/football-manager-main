<template>
    <div class="app-live-match">
        <div class="app-live-match__general">
            <div class="app-live-match__top">
                <span>Campionatul lui Georgel &nbsp; <i class='bx bxs-trophy'></i></span>
                <span><i class='bx bxs-map-pin' ></i> &nbsp; Stadion Olymp</span>
            </div>
            <div class="app-live-match__center">
                <div class="app-live-match__center-templates">
                    <div class="app-live-match__center-template">
                        <img src="../assets/images/club.png" alt="">
                        <div class="app-live-match__center-template-name">
                        Japanez
                        </div>
                        <!-- <ul>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                            <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        </ul> -->
                    </div>
                    <div class="app-live-match__center-templates-center">
                        <div class="app-live-match__center-templates-center-score">0 - 0</div>
                        <span class="app-live-match__center-templates-center-status"><i class='bx bx-play' ></i> &nbsp;Pauza</span>
                        <!-- <span class="app-live-match__center-templates-center-status"><i class='bx bx-play' ></i> &nbsp;10:00</span> -->
                        <!-- <span class="app-live-match__center-templates-center-timer">09:35</span> -->
                    </div>
                    <div class="app-live-match__center-template">
                        <img src="../assets/images/club.png" alt="">
                        <div class="app-live-match__center-template-name">
                        Japanez II
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
                <Stadium v-if="activeSection==0" style="margin-top:1rem;"/>
                <div v-if="activeSection==1" style="margin-top:.5rem;">
                    <AppMatch v-for="z in 6" :key="z" style="margin-top:1rem;"/>
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
                        v-for="(tr, i) in 5"
                        :data="tr"
                    >
                        <vs-td  
                        :class="{'final-secondary-border':i==2|| i==3,'final-border':i==1||i==0}">
                         jAPANEZ
                        </vs-td>
                        <vs-td>
                         12
                        </vs-td>
                        <vs-td>
                         6 
                        </vs-td>
                        <vs-td>
                         6 
                        </vs-td>
                        <vs-td>
                         6 
                        </vs-td>
                        <vs-td>
                         12
                        </vs-td>
                        <vs-td>
                         23
                        </vs-td>
                        <vs-td>
                         12
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
                    </vs-tr>
                    </template>
                    <template #tbody>
                    <vs-tr
                        style="margin-top:5px;"
                        :key="i"
                        v-for="(tr, i) in 25"
                        :data="tr"
                    >
                        <vs-td  >
                         {{i}}.
                        </vs-td>
                        <vs-td>
                         Florin Bucataru
                        </vs-td>
                        <vs-td>
                         Echipa Rosie
                        </vs-td>
                        <vs-td>
                         <i class='bx bx-football' v-for="x in i" :key="x"></i>
                        </vs-td>
                    </vs-tr>
                    </template>
                </vs-table>
            </div>
        </div>
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
    data() {
        return {
            activeSection:0
        }
    },
    methods:{
        changeSection(id) {
            this.activeSection = id;
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
</style>