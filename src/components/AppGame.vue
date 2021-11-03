<template>
    <div class="app-game">
        <vs-card type="4">
    <template #title>
      <h3>{{game.name}}</h3>
    </template>
    <template #img>
      <img src="../assets/images/olymp.jpg" alt="">
    </template>
    <template #text >
      <vs-button
      style="width:100%"
        circle
        color="warn"
        gradient
      >
        Inscrie-te &nbsp; <i class='bx bx-user-plus'></i>
      </vs-button>
    </template>
    <template #interactions>
      <vs-button danger icon>
        24.06.2021
        <br>
        20:00-22:00
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <span class="span">
          {{game.players.length}}/{{game.max_players}}
        </span>  
      </vs-button>
    </template>
  </vs-card>
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

</style>