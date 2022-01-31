<template>
    <div class="app-match">
        <md-card class="md-card-stats">
            <div class="match-card">
                <div class="match-card__team">
                    <span class="match-card__team-name">Echipa verder</span>
                    <ul v-if="extend">
                        <li>Florin Bucataru</li>
                         <li>Florin Bucataru</li>
                          <li>Florin Bucataru</li>
                    </ul>
                </div>
                <div class="match-card__score">
                    1 : 2 
                </div>
                <div class="match-card__team">
                    <span class="match-card__team-name">Echipa rosie</span>
                    <ul v-if="extend">
                        <li>Florin Bucataru</li>
                         <li>Florin Bucataru</li>
                          <li>Florin Bucataru</li>
                    </ul> 
                </div>
            </div>
            <!-- <md-card-header >
            x
            </md-card-header>

            <md-card-content>
            x
            </md-card-content>

            <md-card-actions md-alignment="left">
            x
            </md-card-actions> -->
        </md-card>
        <div class="app-match__extend" @click="extend=!extend">
            <md-icon style="color:white;" v-if="!extend">arrow_circle_down</md-icon>
            <md-icon style="color:white;" v-else>arrow_circle_up</md-icon>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        extented:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            extend:this.extented
        }
    }
}
</script>

<style lang="scss" scoped>
.app-match {
    width: 99%;
    margin: 0 auto;
    position: relative;

    &__extend {
        position: absolute;
        bottom: 16px;
        z-index: 10000;
        left: 50%;
        transform: translateX(-20%);
        background-color: rgb(131, 131, 131);
        color: white;
        border-radius: 50%;
        cursor: pointer;
    }
}

.match-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
    box-sizing: border-box;

    &__team {
        display: flex;
        flex-direction: column;

        &-name {
            font-size: 1.2rem;
        }

        ul {
            margin-top: 20px;
            list-style: none;

            li {
                padding: 1rem 0;
                cursor: pointer;
            }
        }
    }

    &__score {
        font-size: 1.3rem;
    }
}
</style>