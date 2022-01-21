<template>
    <div class="app-homepage">
        <div class="app-homepage-unlogged" v-if="$store.getters.logged_User!=='true'">
            <AppParallaxBackground/>
        <!-- <lottie-player 
            src="https://assets8.lottiefiles.com/packages/lf20_s0e2CP.json"  
            background="transparent"  speed="1"  style="width: 300px; height: 300px;margin-left:auto;"  
            loop autoplay>
        </lottie-player>             -->
        <div class="app-homepage-unlogged__main">
                <div class="center" style="width:100%;">
                <vs-dialog overflow-hidden prevent-close not-close v-model="active" class="login-dialog">
                    <template #header>
                    <h4 class="not-margin app-homepage-unlogged__main-title">
                        Bine ai venit 
                    </h4>
                    </template>
                        <div class="con-form app-homepage-unlogged__main-form">
                        <vs-avatar primary style="margin:0 auto;">
                            <i class='bx bx-football'></i>
                        </vs-avatar>
                        <vs-input v-model="login.email" placeholder="Adresa de email">
                            <template #message-danger v-if="errors_Auth.email">
                                {{errors_Auth.email}}
                            </template>
                            <template #icon>
                            @
                            </template>
                        </vs-input>
                        <vs-input type="password" v-model="login.password" placeholder="Parola">
                            <template #message-danger v-if="errors_Auth.password">
                                {{errors_Auth.password}}
                            </template>
                            <template #icon>
                            <i class='bx bxs-lock'></i>
                            </template>
                        </vs-input>
                        </div>
                        <template #footer class="">
                        <div class="footer-dialog app-homepage-unlogged__main-btn">
                            <vs-button block @click="loginUser">
                            Intra in cont
                            </vs-button>
                        </div>
                        </template>
                </vs-dialog>
                </div>
            </div>
        </div>
        <div v-else class="app-homepage-logged"> 
            <div class="app-games__template" v-for="game in myGames" :key="game.game_id._id">
                <AppGame :game="game.game_id"/>       
            </div>
        </div>
    </div>
</template>

<script>
    import AppParallaxBackground from "../components/AppParallaxBackground.vue";
    export default {
    components:{
        AppParallaxBackground
    },
      data:() => ({
        active: false,
        login:{
            email:"",
            password:"",
        },
        myGames:[]
      }),
      methods:{
          loginUser(){
              let credentials = {
                  email:this.login.email,
                  password:this.login.password
              }
              this.$store.dispatch('loginUser', credentials);
          },
          loadPage(){
                const loading = this.$vs.loading()
                // // alert(localStorage.getItem("game_id"))
                const credentials = {
                    user_id:this.$store.state.user_id,
                    token:this.$store.state.token
                }
            this.axios.get('/get-my-games', { params:credentials }).then((response) => {
                    response = response.data;
                    this.$store.commit("SET_AUTH",response.logged); 
                    console.log(response)
                    if(response.logged==true){
                        this.myGames = [...response.games]
                        if(this.myGames.length == 0) {
                            this.$router.push('/campionate');
                        }
                    }
                    loading.close()
                    console.log("xxx",response)   
            })
          }
      },
      computed:{
          errors_Auth(){
              return this.$store.getters.errors_Auth
          }
      },
      beforeMount(){
          this.loadPage()
      },
      mounted() {
          this.active = true;
      }
    }
  </script>



<style lang="scss" scoped>
.app-homepage {
    
    &-unlogged {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #0f1624;
        // background-image: linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)),url("../assets/images/background.jpg");
        // background-position: center;
        // background-size: cover;
        // filter: blur(3px);

        &__main {
            display: flex;
            flex-direction: column;
            justify-content: center;

            &-title {
                font-family: $font-bold;
                font-size: 2.5rem;
                color: #495057;
                text-align: center;
                display: block;
            }

            &-form {
                max-width: 700px;
                margin: 0 auto;
            }

            &-btn {
                max-width: 300px;
                margin: 0 auto;
            }
           
        }
    }

	&-logged {

	}
}
</style>