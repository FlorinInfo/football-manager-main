<template>
    <div class="app-game-add" v-if="$store.state.add_game.status">
        <div class="app-game-add__input">
            <vs-input v-model="game.name" placeholder="Nume campionat">
                <template #icon>
                <i class='bx bx-trophy' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__time">
            <VueCtkDateTimePicker label="Incepe la" class="app-game-add__time-el" v-model="game.time.start" />
            <VueCtkDateTimePicker label="Sfarseste la" class="app-game-add__time-el" v-model="game.time.end" />
        </div>
        <div class="app-game-add__input">
            <vs-select
            label-placeholder="Stadion"
            v-model="game.stadium_id">
                <vs-option v-for="s in $store.state.add_game.stadiums" :label="s.name" :key="s._id" :value="s._id">
                    {{s.name}}
                </vs-option>
            </vs-select>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="game.max_players" type="number" placeholder="Numar maxim jucatori">
                <template #icon>
                <i class='bx bx-user' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="game.price" type="number" placeholder="Pret">
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
<vs-select
            label-placeholder="Echipa"
            v-model="value2"
            >
                <vs-option label="Vuesax" value="1">
                Echipa Rosie 2/5
                </vs-option>
                <vs-option label="Vue" value="2">
                Vue
                </vs-option>
                <vs-option label="Javascript" value="3">
                Javascript
                </vs-option>
                <vs-option label="Sass" value="4">
                Sass
                </vs-option>
                <vs-option label="Typescript" value="5">
                Typescript
                </vs-option>
                <vs-option label="Webpack" value="6">
                Webpack
                </vs-option>
                <vs-option label="Nodejs" value="7">
                Nodejs
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
        </div>
        {{$store.state.add_game}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            value2:"",
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
                    alert(1)
                }
                console.log(response)
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    beforeMount(){
        this.$store.dispatch('getAddGame');
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