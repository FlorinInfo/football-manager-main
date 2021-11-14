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
    padding: 2rem;
  }
}

.field-input {
  min-height: 33px!important;
  height: 33px!important;
  border: none!important;
  border-radius: 12px!important;
  background: #f4f7f8!important;
  font-size: 12px!important;
  color: rgb(0, 0, 0);
  transform: translateX(-8px)
}

.field-label {
  top:-20px!important;
}

#undefined-input {
  padding-top:0!important;
}
</style>
