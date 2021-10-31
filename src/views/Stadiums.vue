<template>
    <div class="app-stadiums">
        <div class="app-stadiums__cards">
            <AppCardCity class="app-stadiums__card" @goLink="goLink" :stadium="s" v-for="(s,index) in $store.state.stadiums.stadiums" :key="index"/>
        </div>
    </div>
</template>

<script>
import AppCardCity from "../components/AppCityCard.vue";
export default {
    components:{
        AppCardCity
    },
    methods:{
        goLink(id) {
            this.$router.push('/campionate/'+id)
        }
    },
    beforeMount(){
        if(this.$store.getters.logged_User === 'true') {
            this.$store.dispatch("getStadiums");
        }
    },
}
</script>


<style lang="scss" scoped>
.app-stadiums {

    &__cards {
            margin-top:1rem;
        }

		&__card {
            margin: 0 auto;
			&:not(:first-child) {
				margin-top: 1rem;
                
			}
		}
}
</style>