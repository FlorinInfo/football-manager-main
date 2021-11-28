<template>
    <div class="app-game-view">
        <AppGame :game="game" :extented="true" @registerToGame="registerToGame" @loadTeams="loadPage"/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            game:null
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
            const loading = this.$vs.loading()
            this.axios.post('/register-to-game',data).then((response) => {
            loading.close()
                if(response.data.status){
                this.$vs.notification({
                    progress: 'auto',
                    color:"success",
                    position:"top-right",
                    title: 'Super, super! 😎',
                    text: 'Te-ai inscris cu succes la campionat.Bafta bossulica! '
                })
                alert(1)
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
        loadPage() {
            const loading = this.$vs.loading()
            const credentials = {
                user_id:this.$store.state.user_id,
                token:this.$store.state.token,
                game_id:this.$route.params.id
            }
            this.axios.get('/get-game', { params:credentials }).then((response) => {
            response = response.data;
            this.game = {...response.game};
            this.$store.commit("SET_ADD_TEAMS", response.game.teams);
            loading.close()
            console.log(response)   
            })
        }
    },
    beforeMount() {
        this.loadPage();
    }
}
</script>