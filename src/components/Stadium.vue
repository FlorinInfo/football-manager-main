<template>
    <div class="app-stadium">
        <img src="../assets/images/field.jpg" class="app-stadium__field" alt="">
        <div class="app-stadium__player app-stadium__player-1">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-2">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-3">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-4">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-5">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-6">
            <img src="../assets/images/red-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-7">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-8">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-9">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-10">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-11">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div>
        <div class="app-stadium__player app-stadium__player-12">
            <img src="../assets/images/blue-tshirt.png" alt="">
            <span>Mocanel</span>
        </div> 
    </div>
</template>


<style lang="scss" scoped>
.app-stadium {
    width: 100%;
    position: relative;
    

    &__field {
        position: relative;
    }

    &__player {
        position: absolute;
        top: 0;

        img {
            width: 50px;
            border-radius: 50%;
        }

        span {
            display: block;
            text-align: center;
            color: black;
            font-family: $font-bold;
        }

        &-1 {
            top: 50%;
            transform: translateY(-50%);
            left: 10%;
        }

        &-2 {
            top: 20%;
            transform: translateY(-50%);
            left: 14%;
        }
        &-3 {
            top: 80%;
            transform: translateY(-50%);
            left: 14%;
        }
        &-4 {
            top: 50%;
            transform: translateY(-50%);
            left: 24%;
        }
        &-5 {
            top: 80%;
            transform: translateY(-50%);
            left: 40%;
        }
        &-6 {
            top: 20%;
            transform: translateY(-50%);
            left: 40%;
        }
        &-7 {
            top: 20%;
            transform: translateY(-50%);
            right: 40%;
        }
        &-8 {
            top: 80%;
            transform: translateY(-50%);
            right: 40%;
        } 
        &-9 {
            top: 50%;
            transform: translateY(-50%);
            right: 25%;
        }
        &-10 {
            top: 50%;
            transform: translateY(-50%);
            right: 10%;
        }
        &-11 {
            top: 20%;
            transform: translateY(-50%);
            right: 14%;
        }
        &-12 {
            top: 80%;
            transform: translateY(-50%);
            right: 14%;
        }
    }
}
</style>