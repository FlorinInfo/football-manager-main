<template>
 <div>
    <v-app v-if="$store.getters.logged_User!=='true'">
        <v-container fluid>
        <v-row no-gutters>
            <v-col cols="7" class="main-part d-none d-md-none d-lg-flex homepage-background">
            <div class="d-flex">
                <!-- <v-img src="../assets/images/background-homepage.svg" contain></v-img> -->
                <!-- <p>Imaginea lu Biut</p> -->
            </div>
            </v-col>
            <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
            <v-row no-gutters class="align-start">
                <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
                <div class="login-wrapper pt-md-4 pt-0">
                    <v-tabs grow>
                    <v-tabs-slider color="success"></v-tabs-slider>
                    <v-tab :href="`#tab-login`"  >
                        LOGIN
                    </v-tab>
                    <v-tab :href="`#tab-newUser`">
                        New User
                    </v-tab>
                    <v-tab-item :value="'tab-login'" >
                        <v-form style="padding:20px;">
                        <v-container>
                            <v-row class="flex-column">

                            <v-col>
                                <p class="login-slogan display-2 text-center font-weight-medium mt-10">Welcome!</p>                          </v-col>
                            <v-form>
                                <v-col>
                                <v-text-field
                                    v-model="login.email"
                                    label="Email Address"
                                    color="success"
                                    required
                                ></v-text-field>
                                <v-text-field
                                color="success"
                                    v-model="login.password"
                                    type="password"
                                    label="Password"
                                    required
                                ></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-space-between">
                                <v-btn
                                    large
                                    block
                                    :disabled="login.password.length === 0 || login.email.length === 0"
                                    color="success"
                                    @click="loginUser"
                                >
                                    Conecteaza-te</v-btn>
                                </v-col>
                            </v-form>
                            </v-row>
                        </v-container>
                        </v-form>
                    </v-tab-item>
                    
                    <v-tab-item :value="'tab-newUser'" >
                        <v-form>
                        <v-container>
                            <v-row class="flex-column">

                            <v-col>
                                <p class="login-slogan display-2 text-center font-weight-medium mt-10">Welcome!</p>
                                <p class="login-slogan display-1 text-center font-weight-medium mb-10">Create your account</p>
                            </v-col>

                            <v-form>
                                <v-col>
                                <v-text-field
                                    v-model="createFullName"
                                    label="Full Name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="createEmail"
                                    :rules="emailRules"
                                    label="Email Address"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="createPassword"
                                    :rules="passRules"
                                    type="password"
                                    label="Password"
                                    hint="At least 6 characters"
                                    required
                                ></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-space-between">
                                <!-- <v-btn
                                    large
                                    block
                                    :disabled="createFullName.length === 0 || createEmail.length === 0 || createPassword === 0"
                                    color="primary"
                                    @click="loginUser"
                                >
                                    Create your account</v-btn> -->
                                </v-col>
                            </v-form>

                            <v-col cols="12" class="d-flex align-center my-4">
                                <v-divider></v-divider>
                                <span class="px-5"> or </span>
                                <v-divider></v-divider>
                            </v-col>

                            <!-- <v-btn height="45" block color="white" elevation="0" class="google text-capitalize">
                                <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                                Sign in with Google</v-btn> -->
                            </v-row>
                        </v-container>
                        </v-form>
                    </v-tab-item>

                    </v-tabs>
                </div>
                </v-col>
                <!-- <v-col cols="12" class="d-flex justify-center">
                <v-footer>
                    <div class="primary--text">© 2014-2020 <a href="https://flatlogic.com/" class="text-decoration-none">Flatlogic</a>, LLC. All rights reserved.</div>
                </v-footer>
                </v-col> -->
            </v-row>
            </v-col>
        </v-row>
        </v-container>
    </v-app>
    <div v-else class="app-homepage-logged"> 
            <div class="app-games__template" v-for="game in myGames" :key="game.game_id._id">
                <AppGame :game="game.game_id"/>       
            </div>
        </div>
 </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        active: false,
        login:{
            email:"",
            password:"",
        },
        myGames:[],



        email: 'admin@flatlogic.com',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        createFullName: 'John Smith',
        createEmail: 'john@flatlogic.com',
        createPassword: '123456',
        password: '123456',
        passRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Min 6 characters'
        ]
      }
    },
    methods: {
         loginUser(){
              let credentials = {
                  email:this.login.email,
                  password:this.login.password
              }
              this.$store.dispatch('loginUser', credentials);
          },
          loadPage(){
                // const loading = this.$vs.loading()
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
                    // loading.close()
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
    created() {
      if (window.localStorage.getItem('authenticated') === 'true') {
        this.$router.push('/dashboard');
      }
    }
  }

</script>

<style lang="scss" scoped>

@import '~vuetify/src/styles/styles.sass';

// Sidebar //
$drawer-items-padding:                     32px !default;
$navigation-drawer-mini-variant-width:     96px!important;

// Layout //
$body-bg: #F6F7FF !default;
$content-padding:                           24px;

// Colors //
$primary:           #43a047!important;
$secondary:         #FF5C93;
$error:             #ff4081;
$warning:           #FFC260;
$success:           #3CD4A0;
$info:              #9013FE;
$text-color:        #6e6e6e;
$text-grey:         #b9b9b9;
$title-grey:        #4a4a4a;

$card-title-color:  $text-color;

// Typography //
$h1-font-size:                3rem !default;      // 28px
$h2-font-size:                2rem !default;       // 24px
$h3-font-size:                1.64rem !default;     // 22px
$h4-font-size:                1.5rem !default;     // 20px
$h5-font-size:                1.285rem !default;         // 16px
$h6-font-size:                1.142rem !default;     // 14px

// Card //
$card-shadow: 0 3px 11px 0 #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A;

// Buttons //
$button-shadow: 0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A;

body {
  background-color: #F6F7FF !important
}
.container {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 0;

  .main-part {
    width: 100%;
    height: 100vh;
    background-color: $primary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        text-align: center;
        font-family: "Roboto", sans-serif;
        font-size: 84px;
        color: white;
        font-weight: 500;
      }
      .v-image {
        margin-bottom: 32px;
      }
    }

  }
  .login-part {
    width: 100%;
    height: 100vh;
    background-color: #F6F7FF;
    overflow-y: auto;
    .login-wrapper {
      width: 320px;
      height: auto;
      .login-slogan {
        color: #4a4a4a;
      }
      .v-btn.google {
        box-shadow: $card-shadow!important;
      }
      .v-tabs {
        .v-tab {
          font-size: 18px;
        }
        .v-item-group {
          background-color: #F6F7FF;
        }
      }

    }
    .v-footer {
      position: absolute;
      bottom: 0;
      background-color: #F6F7FF;
    }
  }
}


.v-application {
  .page-title {
    font-size: 2.4rem;
    color: $text-grey;
    margin-bottom: 0;
  }
  .v-card {
    box-shadow: $card-shadow!important;
    .v-card__title p{
      color: $card-title-color;
      line-height: 1.33;
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }
    .card-dark-grey {
      color: $title-grey!important;
    }
    .card-light-grey {
      color: $text-color!important;
    }
  }
  .v-navigation-drawer {
    .v-navigation-drawer__content {
      .v-list {
        .v-list-item--active {
          background-color: #F3F5FF;
          &:before {
            opacity: 0;
          }
        }
        .v-list-item:hover {
          background-color: #F3F5FF;
          &:before {
            opacity: 0;
          }
        }
      }
    }
  }

  h1 {
    font-size: $h1-font-size;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1;
  }
  h2 {
    font-size: $h2-font-size;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1;
  }
  h3 {
    font-size: $h3-font-size;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1;
  }
  h4 {
    font-size: $h4-font-size;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1;
  }
  h5 {
    font-size: $h5-font-size;
    font-weight: 400;
    margin-bottom: 16px;
  }
  h6 {
    font-size: $h6-font-size;
    font-weight: 400;
    margin-bottom: 16px;
  }

  .row {
    margin-left: -12px;
    margin-right: -12px;
  }
  .no-gutters {
    margin: 0;
  }
}
.mapContainer + footer.v-footer {
  display: none;
}


.toasted-container {
  .toasted {
    height: 50px!important;
    box-shadow: none;

    &.default {
      background: $primary!important;
    }

    &.error {
      background: $error!important;
    }

    &.success {
      background: $success!important;
    }

    &.info {
      background-color: $primary!important;
    }

    &.warning {
      background: $warning!important;
    }

    .action {
      color: $text-color;
    }
  }
}
.login-part {
    background: white!important;
}

.v-tab--active {
    color:#43a047!important;
}

.v-tab:hover {
    color:#43a047!important;
}


.homepage-background {
    background-image: url('../assets/images/background-homepage2.jpg');
    background-size: cover;
    background-color: #fff!important;
}
</style>