<template>
    <div class="app-game">
      <md-card class="md-card-example" style="max-width:100%;margin-top:20px;" >
      <md-card-area md-inset>
        <md-card-media >
          <div class="app-game__background"></div>
        </md-card-media>
        <md-card-header>
          <h2 class="md-title">{{game.name}}</h2>
          <div style="display:flex;justify-content:space-between;margin-top:10px;">
            <div class="md-subhead">
              <md-icon>location_on</md-icon>
              <span>{{game.stadium_id.name}}</span>
            </div>
            <div class="md-subhead">
              <md-icon>people</md-icon>
              <span style="padding-left:10px;">{{game.players}} / {{game.max_players}}</span>
            </div>
          </div>
        </md-card-header>
      </md-card-area>

      <md-card-content>
        <div class="card-reservation" style="">
            <div class="md-subhead">
              <md-icon>schedule</md-icon>
              <span style="padding-left:10px;">{{game.time.start}}</span>
            </div>
            <div class="md-subhead" style="margin-top:10px;">
              <md-icon>payments</md-icon>
              <span style="padding-left:10px;">{{Math.round(game.price/game.max_players)}} RON</span>
            </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary">
          <span v-if="!edit">
            <span v-if="game.players==game.max_players">In proces</span>
            <span v-else-if="game.reg" @click="$emit('registerToGame',game._id)">Inscris</span>
            <span v-if="game.reg==false&&game.players!=game.max_players" @click="$emit('registerToGame',game._id)">Inscrie-te</span>
          </span>
          <span v-else>Editeaza</span>
        </md-button>
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
        },
        edit:{
          type:Boolean,
          default:false
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