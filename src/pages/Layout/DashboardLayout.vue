<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->

      <md-list>
        <md-list-item class="link-item" @click="goLink('/')"> 
          <md-icon>home</md-icon>
          <p>Acasa</p>
        </md-list-item>
        <md-list-item class="link-item"  @click="goLink('/stadioane')">
          <md-icon>stadium</md-icon>
          <p>Stadioane</p>
        </md-list-item>
        <md-list-item md-expand class="expand-link">
          <md-icon>emoji_events</md-icon>
          <p style="color: white; width: 140px">Campionate</p>
          <md-list slot="md-expand">
            <md-list-item
             @click="goLink('/campionate')"
              class="link-item md-inset"
              style="width: 95%; margin-left: auto"
            >
              <md-icon class="md-size-1x">join_full</md-icon>
              <p>Toate</p>
            </md-list-item>
            <md-list-item
              :id="s.name" v-for="(s,index) in sidebar.stadiums" :key="index" @click="goLink(`/campionate/${s._id}`)"
              class="link-item md-inset"
              style="width: 95%; margin-left: auto"
            >
              <md-icon class="md-size-1x">emoji_events</md-icon>
              <p>{{s.name}}</p>
            </md-list-item>

            <!-- <md-list-item class="md-inset">
              <span>xx</span>
            </md-list-item>
            <md-list-item class="md-inset">Music</md-list-item>
            <md-list-item class="md-inset">Movies</md-list-item>
            <md-list-item class="md-inset">TV Shows</md-list-item> -->
          </md-list>
        </md-list-item>
        <md-list-item md-expand class="expand-link">
          <md-icon>query_stats</md-icon>
          <p style="color: white; width: 140px">Statistici</p>
          <md-list slot="md-expand">
            <md-list-item
              @click="goLink('/statistici/echipe')"
              class="link-item md-inset"
              style="width: 95%; margin-left: auto"
            >
              <md-icon class="md-size-1x">groups</md-icon>
              <p>Echipe</p>
            </md-list-item>
            <md-list-item
              @click="goLink('/statistici/jucatori')"
              class="link-item md-inset"
              style="width: 95%; margin-left: auto"
            >
              <md-icon class="md-size-1x">sports_handball</md-icon>
              <p>Jucatori</p>
            </md-list-item>
          </md-list>
        </md-list-item>
        <md-list-item class="link-item" @click="goLink('/creeaza-campionat')">
          <md-icon>add_box</md-icon>
          <p>Creeaza campionat</p>
        </md-list-item>
        <md-list-item class="link-item" @click="logout">
          <md-icon>logout</md-icon>
          <p>Logout</p>
        </md-list-item>
        <!-- <md-list-item @click="alert">Button</md-list-item>
      <md-list-item href="https://google.com" target="_blank">Link</md-list-item>
      <md-list-item to="/components/list" exact>Router <code>/</code></md-list-item>
      <md-list-item to="/components/list/router">Router <code>/router/**</code></md-list-item> -->
      </md-list>
      <!-- <md-list>
      <md-list-item to="/components/list/router/1">Router <code>/router/1</code></md-list-item>
      <md-list-item to="/components/list/router/2">Router <code>/router/2</code></md-list-item>
    </md-list> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      sidebar:{
        stadiums:[]
      },
    };
  },
  methods:{
    logout(){
      this.$store.commit('LOGOUT_USER');
    },
    goLink(link) {
      this.$router.push(link);
    }
  },
  beforeMount(){
    this.axios.get('/sidebar').then((response) => {
      response = response.data; 
      this.sidebar.stadiums = [...response.stadiums]; 
      console.log(response)
    })
  }
};
</script>

<style lang="scss" scoped>
.link-item {
  padding-right: 20px;
  cursor: pointer;

  p {
    color: white;
    font-weight: 300 !important;
  }
}

.md-inset > p {
  color: white !important;
}

.expand-link > p {
  color: white !important;
}

.md-icon.md-theme-default.md-icon-image svg {
  fill: white !important;
}
</style>
