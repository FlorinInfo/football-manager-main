<template>
    <div class="app-games">
        <h2 class="app-games__title" v-if="$store.state.games.length==0">Din pacate nu sunt meciuri disponibile in acest moment</h2>
        <div v-else class="app-games__template" v-for="game in $store.state.games" :key="game._id">
            <AppGame :game="game" @registerToGame="registerToGame"/>       
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            loading:null
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
                this.$store.dispatch("getGames", this.$route.params.stadium_id);
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
        }
    },
    computed:{
        gamesL() {
            return this.$store.state.games.length;
        }
    },
    beforeMount(){
        this.loading = this.$vs.loading()
        this.$store.dispatch("getGames", this.$route.params.stadium_id);
    },
    watch:{
        'gamesL':function() {
            if(this.gamesL!=0) this.loading.close()
        },
        '$route.params.stadium_id':function() {
            this.$store.dispatch("getGames", this.$route.params.stadium_id);
        }
    }
}
</script>

<style lang="scss" scoped>
.app-games {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;

    &__template {
        width: 100%;
    }

    &__title {
        font-family: $font-semibold;
        text-align: center;
    }
}
</style>