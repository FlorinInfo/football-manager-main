<template>
    <div class="app-add-team">
        <vs-dialog overflow-hidden @close="closeDialog" v-model="opened">
            <template #header>
                <h4 class="not-margin app-homepage-unlogged__main-title">
                    Adauga echipe
                </h4>
            </template>
            <div class="con-form" style="display:block;">
            <vs-input
                primary
            
                placeholder="Nume echipa" />
                <div style="margin:0 auto;display:flex;justify-content:center;">
                <vs-button
                    circle
                    icon
                    floating
                >
                    <i class='bx bx-plus' ></i>
                </vs-button>
            </div>
            </div>
        </vs-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            opened:false
        }
    },
    methods:{
        closeDialog() {
            this.$store.commit("SET_D_TEAM", false);
        }
    },
    watch:{
        "$store.state.d_team" :function() {
            this.opened = this.$store.state.d_team;
        }
    }
}
</script>