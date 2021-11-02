<template>
    <div class="app-city-card" @click="$emit('goLink',stadium._id)">
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
    }
}
</script>

<style lang="scss" scoped>
.app-city-card {
    width: 95vw;
    height: 25vh;
    background-image: linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)),url("../assets/images/olymp.jpg");
    background-position: bottom;
    background-size: cover;
    max-width: 100vw;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.096);
    border-radius: 10px;
    padding-top: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: .1s;

    &:hover {
        -webkit-transform: skew(-10deg);
        transform: skew(-10deg);
    }

    &__location {
        color: white;
        z-index: 10000;
        display: block;
        font-family: $font-light;
    }

    &__name {
        color: white;
        z-index: 10000;
        display: block;
        font-family: $font-bold;
        margin-top: .5rem;
    }
}
</style>