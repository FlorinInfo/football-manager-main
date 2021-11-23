<template>
    <div class="app-live-match">
        <div class="app-live-match__top">
            <span>Campionatul lui Georgel &nbsp; <i class='bx bxs-trophy'></i></span>
            <span><i class='bx bxs-map-pin' ></i> &nbsp; Stadion Olymp</span>
        </div>
        <div class="app-live-match__center">
            <div class="app-live-match__center-templates">
                <div class="app-live-match__center-template">
                    <img src="../assets/images/club.png" alt="">
                    <div class="app-live-match__center-template-name">
                    Japanez
                    </div>
                    <!-- <ul>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                    </ul> -->
                </div>
                <div class="app-live-match__center-templates-center">
                    <div class="app-live-match__center-templates-center-score">0 - 0</div>
                    <span class="app-live-match__center-templates-center-status"><i class='bx bx-play' ></i> &nbsp;Pauza</span>
                    <!-- <span class="app-live-match__center-templates-center-status"><i class='bx bx-play' ></i> &nbsp;10:00</span> -->
                    <!-- <span class="app-live-match__center-templates-center-timer">09:35</span> -->
                </div>
                <div class="app-live-match__center-template">
                    <img src="../assets/images/club.png" alt="">
                    <div class="app-live-match__center-template-name">
                    Japanez II
                    </div>
                    <!-- <ul>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                        <li><img src="../assets/images/red-tshirt.png" alt=""> <span>Ionel Fotbal</span></li>
                    </ul> -->
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.app-live-match {
    background-image: linear-gradient(rgb(0, 0, 0), rgba(2, 2, 2, 0.397)),url("../assets/images/live-match.jpg");
    background-position: bottom;
    background-size: 100%;
    width:100%;
    min-height:200px; 
    padding: 2rem;
    box-sizing: border-box;

    &__top {
        color: white;
        display: flex;
        justify-content: center;
        border-bottom: .5px solid rgba(255, 255, 255, 0.198);
        margin: 0 auto;
        padding-bottom: 1rem;

        span {
            font-family: $font-light; 
            font-size: 1.2rem;
            
            &:first-child{
                margin-right: 5rem;
            }

            &:nth-child(2) {
                margin-left: 5rem;
            }

            i {
                transform: translateY(2px);
            }
        }
    }

    &__center {
        color: white;
        margin-top:4rem;

        &-templates {
            display: flex; 
            justify-content: center;
            margin: 0 auto;

            &-center {
                display: flex;
                flex-direction: column; 
                padding: 0 4rem;

                &-score {
                    margin: 0 auto;
                    display: block;
                    font-size: 1.7rem;
                    font-family: $font-semibold;
                }

                &-status {
                    display: block;
                    padding: .5rem 3rem;
                    background: white; 
                    color: black;
                    font-family: $font-medium;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-top: 2rem;
                }

                &-timer {
                    display: block;
                    text-align: center;
                    font-family: $font-semibold;
                    margin-top: 2rem;
                    font-size: 1.5rem;
                    letter-spacing: 2px;
                }
            }
        }

        &-template {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 200px;

            img {
                width: 80px;
                display: block;
                margin: 0 auto;
            }

            &-name {
                display: block;
                margin: 0 auto;
                font-family: $font-medium;
                font-size: 1.7rem;
                margin-top: 10px;
            }

            ul {
                margin: 0 auto;
                list-style: none;
                font-family: $font-medium;
                margin-top: 1rem;

                li {
                    padding: .5rem 0;
                    font-size: 1rem;
                    display: flex;
                    cursor: pointer; 

                    span {
                        display: block;
                        margin: auto;
                        margin-left: 5px;
                    }

                    img {
                        width: 25px;
                    }
                }
            }
        }
    }
}
</style>