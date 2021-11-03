<template>
    <div class="app-games">
        <div class="app-games__template" v-for="game in $store.state.games" :key="game._id">
            <AppGame :game="game"/>
        </div>
    </div>
</template>


<script>
import AppGame from "../components/AppGame.vue";
export default {
    components:{
        AppGame
    },
    beforeMount(){
        this.$store.dispatch("getGames", this.$route.params.stadium_id);
    }
}
</script>

<style lang="scss" scoped>
.app-games {
    display: flex;

    &__template {
        margin: 0 auto;
    }
}
</style>