<template>
<div>
  <div v-if="$store.getters.logged_User!=='true'">
    <router-view></router-view>
  </div>
  <DashboardLayout v-else>
    <router-view></router-view>
  </DashboardLayout>
  <notifications></notifications>
</div>
</template>


<script>
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
export default {
  components:{
    DashboardLayout
  }
}
</script>

<style lang="scss">
.md-icon.md-theme-default.md-icon-image svg {
  fill:#ffff!important;
}
</style>