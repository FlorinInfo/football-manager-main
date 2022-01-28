<template>
    <div class="app-game-view" >
        <div v-if="$route.params.c_type=='full'&&game_status==1">
            <LiveMatch :live="live" @reload="loadPage" @endGame="endGame"/>
        </div>
        <div v-else>
            <div v-if="live">
                 Statistici campionat
            <div v-for="m in live.matches" :key="m.id">{{m}}</div>
            </div>
        </div>
        <AppGame  
            v-if="$route.params.c_type!='full'"
            :game="game" 
            :extented="true" 
            @registerToGame="registerToGame" 
            @loadTeams="loadPage"/>
    </div>
</template>

<script>
import LiveMatch from "../components/LiveMatch.vue";
export default {
    components:{
        LiveMatch
    },
    data(){
        return {
            game:null,
            live:null,
            game_status:0,
            loading:true
        }
    },
    methods:{
        registerToGame(id) {
            let data = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:id
            }
            console.log(id)
            this.loading = this.$vs.loading()
            this.axios.post('/register-to-game',data).then((response) => {
            this.loading.close()
                if(response.data.status){
                this.$vs.notification({
                    progress: 'auto',
                    color:"success",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: 'Te-ai inscris cu succes la campionat.Bafta bossulica! '
                })
                // alert(1)
                localStorage.setItem("game_id",id);  
                this.loadPage();
            }
            else {
                this.$vs.notification({
                    progress: 'auto',
                    color:"danger",
                    position:"top-right",
                    title: 'Sorry, sorry! 🤨',
                    text: 'Te-ai inscris deja la acest campionat bossulica... '
                })
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
            this.loading = this.$vs.loading()
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:this.$route.params.id
            }
            if(this.$route.params.c_type=="full") {
                this.axios.get('/get-live', { params:credentials }).then((response) => {
                    response = response.data;
                    this.live = response.data;
                    this.game_status = response.data.game_status;
                    this.$store.commit("SET_AUTH",response.logged); 
                    this.loading.close()
                    console.log("xxx",response)   
                })
            }
            else {
                this.axios.get('/get-game', { params:credentials }).then((response) => {
                response = response.data;
                this.game = {...response.game};
                this.$store.commit("SET_ADD_TEAMS", response.game.teams);
                this.loading.close()
                console.log(response)   
                })
            }
        }
    },
    beforeMount() {
        this.loadPage();
    }
}
</script>