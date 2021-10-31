<template>
    <div class="app-games">
        {{$store.state.stadiums}}
    </div>
</template>


<script>
export default {
    beforeMount(){
        this.$store.dispatch("getStadiums");
    }
}
</script>