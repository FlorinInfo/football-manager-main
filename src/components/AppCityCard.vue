<template>
    <div class="app-city-card" 
        @click="$emit('goLink',stadium._id)"
        :style="{backgroundImage:'linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)),url(' + require('../assets/images/stadiums/' + getImgUrl()) + ')'}"
    >
    <img :src="getImgUrl" alt=""> 
        <span class="app-city-card__location">
            {{stadium.location}}
        </span>
        <span class="app-city-card__name">{{stadium.name}}</span>
    </div>
</template>


<script>
export default {
    props:{
        stadium:{
            type:Object,
            default:()=>{}
        }
    },
    methods:{
        getImgUrl () {
            let pic = Math.floor(Math.random() * (4 - 1 + 1) + 1)
            return pic + '.jpg';
		},
    },
}
</script>

<style lang="scss" scoped>
.app-city-card {
    width: 95%;
    height: 25vh;
    // background-image: linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)),url("../assets/images/stadiums/4.jpg");
    background-position: center;
    background-size: cover;
    max-width: 100vw;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.096);
    padding-top: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: .1s;

    // &:hover {
    //     -webkit-transform: skew(-10deg);
    //     transform: skew(-10deg);
    // }

    &__location {
        color: white;
        z-index: 10000;
        display: block;  
        font-size: 1.2rem;
    }

    &__name {
        color: white;
        z-index: 10000;
        display: block;
        margin-top: .5rem;
        font-weight: bold;
        font-size: 1.2rem;
    }
}
</style>