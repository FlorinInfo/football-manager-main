<template>
    <div class="app-game-view">
        <AppGame :game="game"/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            game:null
        }
    },
    beforeMount() {
        const loading = this.$vs.loading()
        const credentials = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            game_id:this.$route.params.id
        }
        this.axios.get('/get-game', { params:credentials }).then((response) => {
        response = response.data;
        this.game = {...response.game};
        loading.close()
        console.log(response)   
        })
    }
}
</script>