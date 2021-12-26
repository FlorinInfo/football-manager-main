<template>
    <div class="app-statistics">
        <vs-table striped v-if="$route.params.type=='jucatori'">
        <template #header>
          <vs-input v-model="search" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr>
            <vs-th  >
              Nr.
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'first_name')">
              Nume Prenume
            </vs-th>
            <vs-th >
              Meciuri
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'wins')">
              Castiguri 
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'equals')">
              Egaluri 
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'loses')">
              Pierderi 
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'goals')">
              Goluri 
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'goalketer')">
              Golgheter 
            </vs-th>
            <vs-th sort @click="stats = $vs.sortData($event ,stats, 'champion')">
              Campion 
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getSearch(stats, search)"
            :data="tr"
          >
            <vs-td >
                {{i+1}}
            </vs-td>
            <vs-td>
                {{tr.first_name}} {{tr.second_name}}
            </vs-td>
            <vs-td>
                {{tr.wins + tr.loses + tr.equals}}
            </vs-td>
            <vs-td>
                {{tr.wins}}
            </vs-td>
            <vs-td>
                {{tr.equals}}
            </vs-td>
            <vs-td>
                {{tr.loses}}
            </vs-td>
            <vs-td>
                {{tr.goals}}
            </vs-td>
            <vs-td>
                {{tr.goalketer}}
            </vs-td>
            <vs-td>
                {{tr.champion}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
        <vs-table striped v-if="$route.params.type=='echipe'">
        <template #header>
          <vs-input v-model="search" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr>
            <vs-th  >
              Nr.
            </vs-th>
            <vs-th >
              Nume echipa
            </vs-th>
            <vs-th >
              Meciuri
            </vs-th>
            <vs-th >
              Castiguri 
            </vs-th>
            <vs-th >
              Egaluri 
            </vs-th>
            <vs-th >
              Pierderi 
            </vs-th>
            <vs-th >
              Goluri date
            </vs-th>
            <vs-th >
              Goluri primite 
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in stats"
            :data="tr"
          >
            <vs-td >
                {{i+1}}
            </vs-td>
            <vs-td>
               {{tr.name}}
            </vs-td>
              <vs-td>
               {{tr.stats.matches}}
            </vs-td>
              <vs-td>
               {{tr.stats.wins}}
            </vs-td>
            <vs-td>
               {{tr.stats.eq}}
            </vs-td>
            <vs-td>
               {{tr.stats.loses}}
            </vs-td> 
            <vs-td>
               {{tr.stats.gm}}
            </vs-td>
            <vs-td>
               {{tr.stats.gp}}
            </vs-td>
           
          </vs-tr>
        </template>
      </vs-table>
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
        const loading = this.$vs.loading()
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
                loading.close();
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