<template>
    <div class="app-match">
        <div class="app-match-live"></div>
        <div class="app-match__team">
            <img src="../assets/images/club.png" alt="club">
            <span>Echipa rosie</span>
        </div>
        <div class="app-match__score">
            <span>vs</span>
        </div>
        <div class="app-match__team">
            <span >Echipa rosie</span>
            <img src="../assets/images/club.png" alt="club">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-match {
    width: 100%;
    display: flex;
    position: relative;
    -webkit-box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.055);
    box-shadow: 0 .2rem 2rem rgba(0, 0, 0, 0.103);
    border-radius: 5px;
    padding: 1rem;
    justify-content: center;

    &-live {
        position: absolute;
        width: 2px;
        height: 60%;
        background: red;
        top: 0;
        left: 0px;
        transform: translateY(40%);
    }

    &__team {
        display: flex;

        &:nth-child(2) {
            margin-right: 3rem;
        }

        &:nth-child(4) {
            margin-left: 3rem;
        }

        img {
            width: auto;
            height: 30px;
            display: block;

            &:nth-child(2) {
                margin-left: .5rem;
            }
        }

        span {
            font-family: $font-light;
            display: block;
            margin-top: auto;
            margin-bottom: auto;
            
            &:nth-child(2) {
                margin-left: .5rem; 
            }
        }
    }

    &__score {
        background: rgba(28, 0, 65, 0.911);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
    }
}
</style>