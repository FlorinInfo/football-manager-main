<template>
    <div class="app-game">
      <md-card class="md-card-example" style="max-width:100%;margin-top:20px;" v-for="game in $store.state.games" :key="game._id">
      <md-card-area md-inset>
        <md-card-media >
          <div class="app-game__background"></div>
        </md-card-media>
        <md-card-header>
          <h2 class="md-title">{{game.name}}</h2>
          <div class="md-subhead">
            <md-icon>location_on</md-icon>
            <span>Stadion Olymp</span>
            {{game}}
          </div>
        </md-card-header>

        <md-card-content>
          Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages.
        </md-card-content>
      </md-card-area>

      <md-card-content>
        <h3 class="md-subheading">Ora programata</h3>
        <div class="card-reservation" style="">
          <md-icon>access_time</md-icon>
          <div class="md-button-group">
            <div>12:00</div>
            <!-- <md-button>7:30PM</md-button>
            <md-button>9:00PM</md-button> -->
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary">Inscrie</md-button>
      </md-card-actions>
    </md-card>
    </div>
</template>

<script>
export default {
    props:{
        game:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>

<style lang="scss" scoped>
.app-game {

    &__background {
        max-height: 200px;
        height: 200px;
        background-position: center!important;
        background-repeat: no-repeat!important;
        background-size: cover; 
        background: url("../assets/images/game-background.jpg");
        width: 100%;
    }
}
</style>