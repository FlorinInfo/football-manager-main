<template>
    <div class="app-games">
        <div class="app-games__template" v-for="game in $store.state.games" :key="game._id">
            <AppGame :game="game" @registerToGame="registerToGame"/>       
        </div>
    </div>
</template>


<script>
export default {
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
    beforeMount(){
        this.$store.dispatch("getGames", this.$route.params.stadium_id);
    },
    watch:{
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
}
</style>