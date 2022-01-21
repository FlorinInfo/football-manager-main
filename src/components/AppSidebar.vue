<template>
    <div class="hidden">
      <vs-sidebar
        class="desktop-sidebar"
        absolute
        hover-expand
        reduce
        v-model="active"
        open
        >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home" to="/">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          Acasa
        </vs-sidebar-item>
        <vs-sidebar-item id="market" to="/stadioane">
          <template #icon >
            <i class='bx bx-grid-alt'></i>
          </template>
            Stadioane
        </vs-sidebar-item>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class='bx bx-football'></i>
              </template>
              Campionate
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="twitter" to="/campionate">
            <template #icon>
              <i class='bx bxl-twitter' ></i>
            </template>
            Toate
          </vs-sidebar-item>
          <vs-sidebar-item :id="s.name" v-for="(s,index) in sidebar.stadiums" :key="index" :to="'/campionate/'+s._id">
            <template #icon>
              <i class='bx bx-trophy' ></i>
            </template>
            {{s.name}}
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow >
              <template #icon>
                <i class='bx bx-stats' ></i>
              </template>
              Statistici
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="github" to='/statistici/jucatori'>
            <template #icon>
              <i class='bx bx-group'></i>
            </template>
            Jucatori
          </vs-sidebar-item>
          <vs-sidebar-item id="codepen" to='/statistici/echipe'>
            <template #icon>
              <i class='bx bxl-microsoft-teams' ></i>
            </template>
            Echipe
          </vs-sidebar-item>
          <!-- <vs-sidebar-item id="discord" to='/statistici/campionate'>
            <template #icon>
              <i class='bx bx-football' ></i>
            </template>
            Campionate
          </vs-sidebar-item> -->
        </vs-sidebar-group>
        <vs-sidebar-item id="add" to="/creeaza-campionat">
          <template #icon>
            <i class='bx bx-add-to-queue' ></i>
          </template>
          Creeaza campionat
        </vs-sidebar-item>
        <!-- <vs-sidebar-item id="donate">
          <template #icon>
            <i class='bx bx-news' ></i>
          </template>
          Actualizari
        </vs-sidebar-item> -->
        <div @click="logout">
            <vs-sidebar-item id="logout" >
            <template #icon>
                <i class='bx bx-log-out' ></i>
            </template>
            Logout
            </vs-sidebar-item>
        </div>
        <!-- <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>

            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>
          </vs-row>
        </template> -->
      </vs-sidebar>
      <div class="mobile-navbar hidden">
        <vs-navbar shadow square center-collapsed v-model="active">
          <template #right>
            <vs-button @click="activeSidebar = !activeSidebar" flat icon>
              <i class='bx bx-menu' v-if="!activeSidebar"></i>
              <i class='bx bx-x' v-else></i>
            </vs-button>
          </template>
        </vs-navbar>
      <vs-sidebar
        absolute
        v-model="active"
        :open.sync="activeSidebar"
        >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home" to="/">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          Acasa
        </vs-sidebar-item>
        <vs-sidebar-item id="market" to="/stadioane" > 
          <template #icon >
            <i class='bx bx-grid-alt'></i>
          </template>
            Stadioane
        </vs-sidebar-item>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class='bx bx-football'></i>
              </template>
              Campionate
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="twitter" to="/campionate">
            <template #icon>
              <i class='bx bxl-twitter' ></i>
            </template>
            Toate
          </vs-sidebar-item>
          <vs-sidebar-item :id="s.name" v-for="(s,index) in sidebar.stadiums" :key="index" :to="'/campionate/'+s._id">
            <template #icon>
              <i class='bx bx-trophy' ></i>
            </template>
            {{s.name}}
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow >
              <template #icon>
                <i class='bx bx-stats' ></i>
              </template>
              Statistici
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="github" to='/statistici/jucatori'>
            <template #icon>
              <i class='bx bx-group'></i>
            </template>
            Jucatori
          </vs-sidebar-item>
          <vs-sidebar-item id="codepen" to='/statistici/echipe'>
            <template #icon>
              <i class='bx bxl-microsoft-teams' ></i>
            </template>
            Echipe
          </vs-sidebar-item>
          <!-- <vs-sidebar-item id="discord" to='/statistici/campionate'>
            <template #icon>
              <i class='bx bx-football' ></i>
            </template>
            Campionate
          </vs-sidebar-item> -->
        </vs-sidebar-group>
        <vs-sidebar-item id="add" to="/creeaza-campionat">
          <template #icon>
            <i class='bx bx-add-to-queue' ></i>
          </template>
          Creeaza campionat
        </vs-sidebar-item>
        <!-- <vs-sidebar-item id="donate">
          <template #icon>
            <i class='bx bx-news' ></i>
          </template>
          Actualizari
        </vs-sidebar-item> -->
        <div @click="logout">
            <vs-sidebar-item id="logout" >
            <template #icon>
                <i class='bx bx-log-out' ></i>
            </template>
            Logout
            </vs-sidebar-item>
        </div>
        <!-- <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>

            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>
          </vs-row>
        </template> -->
      </vs-sidebar>
      </div>
    </div>
  </template>

  <script>
  export default {
      data(){
          return {
              active:'home',
              sidebar:{
                stadiums:[]
              },
              activeSidebar:false
          }
      },
      methods:{
          goLink(link){
              alert(1)
              this.$router.push(link);
          },
          logout(){
              this.$store.commit('LOGOUT_USER');
          }
      },
      beforeMount(){
        this.axios.get('/sidebar').then((response) => {
          response = response.data; 
          this.sidebar.stadiums = [...response.stadiums]; 
          console.log(response)
        })
      }
  }
  </script>


  <style lang="scss" scoped>
    .mobile-navbar {
      display: none;
    }

  @media screen and (max-width: 700px) {
    .desktop-sidebar {
      display: none;
    }
    .mobile-navbar {
      display: block;
    }
  }
  </style>