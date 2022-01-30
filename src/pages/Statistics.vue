<template>
    <div class="app-statistics">
        <md-card v-if="$route.params.type=='jucatori'">
          <md-card-header data-background-color="green">
            <h4 class="title">Statistica jucatori</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <md-table v-model="stats" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nume Prenume">{{ item.first_name }} {{item.second_name}}</md-table-cell>
                <md-table-cell md-label="Meciuri jucate">{{ item.wins + item.loses + item.equals }}</md-table-cell>
                <md-table-cell md-label="Castiguri">{{ item.wins }}</md-table-cell>
                <md-table-cell md-label="Egaluri">{{ item.equals }}</md-table-cell>
                <md-table-cell md-label="Pierderi">{{ item.loses }}</md-table-cell>
                <md-table-cell md-label="Goluri marcate">{{ item.goals }}</md-table-cell>
                <md-table-cell md-label="Goalketer">{{ item.goalketer }}</md-table-cell>
                <md-table-cell md-label="Campionate castigate">{{ item.champion }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
 <md-card v-if="$route.params.type=='echipe'">
          <md-card-header data-background-color="green">
            <h4 class="title">Statistica echipe</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <md-table v-model="stats" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nume Echipa">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Meciuri">{{ item.stats.matches }}</md-table-cell>
                <md-table-cell md-label="Castiguri">{{ item.stats.wins }}</md-table-cell>
                <md-table-cell md-label="Egaluri">{{ item.stats.eq }}</md-table-cell>
                <md-table-cell md-label="Pierderi">{{ item.stats.loses }}</md-table-cell>
                <md-table-cell md-label="Goluri marcate">{{ item.stats.gm }}</md-table-cell>
                <md-table-cell md-label="Goluri primite">{{ item.stats.gp }}</md-table-cell>
              </md-table-row>
            </md-table>
            <!-- <simple-table table-header-color="green"></simple-table> -->
          </md-card-content>
        </md-card>

    </div>
</template>



<script>
export default {
    data(){
        return {
            s_type:"",
            search:"",
            stats:[]
        }
    },
    methods:{
      loadPage() {
        // const loading = this.$vs.loading()
        this.s_type = this.$route.params.type;
        const data = {
            user_id:this.$store.state.user_id,
            token:this.$store.state.token,
            s_type:this.$route.params.type
        }
        console.log(data)
        this.axios.get("/statistics", {params:data}).then((response)=>{
            response = response.data;
            console.log(response)
            this.$store.commit("SET_AUTH", response.logged);
            if(response.status==true) {
                console.log(response)
                this.stats = response.stats;
                let newStats = []
                if(this.$route.params.type == 'jucatori'){
                  for(let el of this.stats) {
                      el.stats.first_name = el.first_name;
                      el.stats.second_name = el.second_name;
                      delete el.first_name;
                      delete el.second_name;
                      newStats.push(el.stats);
                  }
                  this.stats = [...newStats];
                }

                
                console.log(this.stats)
                // loading.close();
            }
        }).catch(error=>{
            console.log(error);
        })
      }
    },
    beforeMount(){
      this.loadPage()
    },
    watch:{
      '$route.params.type':function() {
        this.loadPage();
      }
    }
}
</script>