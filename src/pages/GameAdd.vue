<template>
    <div class="game-add">
        <md-card >
                <md-card-header data-background-color="green">
                    <h4 class="title">Adauga campionat</h4>
                    <!-- <p class="category">Here is a subtitle for this table</p> -->
                </md-card-header>
                <md-card-content>
                 <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Nume campionat</label>
                    <md-input v-model="game.name" type="text"></md-input>
                    <md-icon>emoji_events</md-icon>  
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.name">{{errors.name}}</span>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Numar maxim de jucatori</label>
                    <md-input v-model="game.max_players" type="number"></md-input>
                    <md-icon>sports_handball</md-icon> 
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.max_players">{{errors.max_players}}</span>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                    <label>Pret</label>
                    <md-input v-model="game.price" type="number"></md-input>
                    <md-icon>local_atm</md-icon> 
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.price">{{errors.price}}</span>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                    <label>Stadion</label>
                    <md-select v-model="game.stadium_id" name="movie" id="movie">
                        <md-option v-for="s in $store.state.add_game.stadiums"  :key="s._id" :value="s._id">{{s.name}}</md-option>
                    </md-select>  
                    <md-icon>stadium</md-icon> 
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.stadium_id">{{errors.stadium_id}}</span>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                    <label>Pret</label>
                    <VueCtkDateTimePicker label="Incepe la" color="#43a047" button-color="#9c27b0" v-model="game.time.start" />
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.time">{{errors.time}}</span>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                    <label>Pret</label>
                    <VueCtkDateTimePicker label="Sfarseste la" color="#43a047" button-color="#9c27b0" v-model="game.time.end" />
                    </md-field>
                    <span class="input-error" v-if="errors&&errors.time">{{errors.time}}</span>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                    <md-button class="md-raised md-success" @click="addGame">Creeaza</md-button>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <h4>Campionate create</h4>
                </div >
                <div class="md-layout-item md-small-size-100 md-size-50" v-for="g in $store.state.add_game.games" :key="g._id">
                    <AppGame :game="g" :edit="true"/>
                </div>
                </div>
        </md-card-content>
        </md-card>
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
            errors:null,
            teams:[],
            z:'',
            create:false
        }
    },
    // computed:{
    //     teams(){
    //         return this.$store.state.add_game.teams;
    //     }
    // },
    methods:{
        addGame(){
            const data = {
                token:this.$store.state.token,
                user_id:this.$store.state.user_id,
                ...this.game
            }
            this.axios.post("/add-game", data).then((response)=>{
                response = response.data;
                console.log(response)
                // localStorage.setItem("game_id", response.gameSave._id);
                this.$store.commit("SET_AUTH", response.logged);
                if(response.status==true) {
                    this.$store.dispatch('getAddGame', null);
                    this.errors = null;  
                    this.game.name = "";
                    this.game.price = "";
                    this.game.time.start = "";
                    this.game.time.end = "";
                    this.game.max_players = "";
                    this.game.stadium_id = "";
                    // this.game_id = response.gameSave._id;
                    // localStorage.setItem("game_id", this.game_id);
                    // this.$store.dispatch('getAddGame', localStorage.getItem("game_id"));
                    this.create = false;
                }
                else {
                    this.errors = response.errors;
                    console.log(this.errors)
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        openCreate() {
            this.create = true;
        }
    },
    beforeMount(){
        this.$store.dispatch('getAddGame', "");
        const credentials = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            game_id:localStorage.getItem("game_id")
        }
       this.axios.get('/add-game', { params:credentials }).then((response) => {
        response = response.data;
        this.teams = response.teams;
        // console.log(response)   
        })
    },
    watch:{
        // team(){
        //     alert(this.team)
        // },
        "$store.state.add_game":function(){
            if(this.$store.state.add_game.name) {
                this.game.name = this.$store.state.add_game.name;
                this.game.time.start = this.$store.state.add_game.time.start;
                this.game.time.end = this.$store.state.add_game.time.end;
                this.game.stadium_id = this.$store.state.add_game.stadium_id;
                // this.stadiums
                // this.teams = [...this.$store.state.add_game.teams]
                console.log(this.teams)
                this.game.price = this.$store.state.add_game.price;
                this.game.max_players = this.$store.state.add_game.max_players;
            }
        }
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