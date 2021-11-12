<template>
    <div class="app-games">
        <div class="app-games__template" v-for="game in $store.state.games" :key="game._id">
            <AppGame :game="game"/>       
        </div>
    </div>
</template>


<script>
export default {
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