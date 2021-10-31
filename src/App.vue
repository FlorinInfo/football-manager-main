<template>
  <div id="app">
    <div class="app-unlogged" v-if="$store.getters.logged_User!=='true'">
      <router-view/>
    </div>
    <div class="app-logged" v-else>
      <AppSiderbar/>
      <div class="app-logged__main">
        <router-view/>
      </div>
    </div>

    
  </div>
</template>

<script>
import AppSiderbar from "./components/AppSidebar.vue"
export default {
  components:{
    AppSiderbar
  }
}
</script>

<style lang="scss">
html {
  width: 100vw;
  overflow-x: hidden;
}

.app-logged {
  
  &__main {
    width: calc(100vw - 50px);
    margin-left: auto;
  }
}
</style>
