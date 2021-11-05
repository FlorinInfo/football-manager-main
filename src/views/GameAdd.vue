<template>
    <div class="app-game-add" v-if="$store.state.add_game">
        <div class="app-game-add__input">
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
                v-else
                label-placeholder="Stadion"
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
        <div class="app-game-add__input" style="display:flex">
        <vs-input placeholder="Nume echipa">
            <template #icon>
                <i class='bx bxl-microsoft-teams' ></i>
            </template>
        </vs-input>
        <vs-button>
            <i class="bx bx-home-alt"></i> Adauga echipa
        </vs-button>
        </div>
        <div class="app-game-add__input" >
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
                <vs-tr>
                    <vs-td>
                    Florin Bucataru
                    </vs-td>
                    <vs-td>
                    150
                    </vs-td>
                    <vs-td>
                    <vs-select placeholder="Select" v-model="team" v-if="$store.state.add_game.teams">
                        <vs-option v-for="t in $store.state.add_game.teams" :key="t._id" :label="t.name" value="1">
                            {{t.name}}
                        </vs-option>
                    </vs-select>
                    </vs-td>
                </vs-tr>
                </template>
            </vs-table>
        </div>
        <div>
            <vs-select
                label-placeholder="Stadion"
                v-model="team">
                <vs-option v-for="s in $store.state.add_game.teams" :label="s.name" :key="s._id" value="1">
                    {{s.name}}
                </vs-option>
            </vs-select>
        <vs-button
            @click="addGame"
            block
        >
            <i class='bx bx-play' ></i>Programeaza campionat
        </vs-button>
        </div>
        {{$store.state.add_game}}
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
            errors:null
        }
    },
    methods:{
        addGame(){
            const data = {
                token:this.$store.state.token,
                user_id:this.$store.state.user_id,
                ...this.game
            }
            this.axios.post("/add-game", data).then((response)=>{
                response = response.data;
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    this.game_id = response.gameSave._id;
                    localStorage.setItem("game_id", this.game_id);
                    this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    beforeMount(){
        this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
       
    },
    watch:{
        "$store.state.add_game":function(){
            if(this.$store.state.add_game.name) {
                this.game.name = this.$store.state.add_game.name;
                this.game.time.start = this.$store.state.add_game.time.start;
                this.game.time.end = this.$store.state.add_game.time.end;
                this.game.stadium_id = this.$store.state.add_game.stadium_id;
                this.stadiums
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

    &__input {
        margin: 1.5rem;
    }

    &__time {
        display: flex;
        flex-direction: column;
        justify-content: start;

        &-el {
            width: 200px;
            margin-left: 2rem;
            margin-top: 1rem;
        }
    }
}
</style>