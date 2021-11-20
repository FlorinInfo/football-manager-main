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
                v-model="name"
                placeholder="Nume echipa" />
                <div style="margin:0 auto;display:flex;justify-content:center;">
                <vs-button
                    @click="addTeam"
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
            opened:false,
            name:""
        }
    },
    methods:{
        closeDialog() {
            this.$store.commit("SET_D_TEAM", false);
        },
        addTeam() {
            this.$emit('addTeam', this.name);
        }
    },
    watch:{
        "$store.state.d_team" :function() {
            this.opened = this.$store.state.d_team;
        }
    }
}
</script>