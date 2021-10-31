<template>
    <div class="app-game-add" v-if="$store.state.add_game.status">
        <div class="app-game-add__input">
            <vs-input v-model="game.name" placeholder="Nume campionat">
                <template #icon>
                <i class='bx bx-trophy' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input">
            <vs-select
            label-placeholder="Stadion"
            v-model="game.stadium">
                <vs-option v-for="s in $store.state.add_game.stadiums" :label="s.name" :key="s.id" :value="s.id">
                    {{s.name}}
                </vs-option>
            </vs-select>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="value1" type="number" placeholder="Numar maxim jucatori">
                <template #icon>
                <i class='bx bx-user' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input">
            <vs-input v-model="value1" type="number" placeholder="Pret">
                <template #icon>
                <i class='bx bx-money' ></i>
                </template>
            </vs-input>
        </div>
        <div class="app-game-add__input" style="display:flex">
        <vs-input v-model="value1" placeholder="Nume echipa">
            <template #icon>
            <i class='bx bxl-microsoft-teams' ></i>
            </template>
        </vs-input>
        <vs-button>
            <i class="bx bx-home-alt"></i> Adauga echipa
        </vs-button>
        </div>
        <div class="app-game-add__input" >
            <vs-table>
                <template #thead>
                <vs-tr>
                    <vs-th>
                    Nume
                    </vs-th>
                    <vs-th>
                    Goluri
                    </vs-th>
                    <vs-th>
                    Echipa
                    </vs-th>
                </vs-tr>
                </template>
                <template #tbody>
                <vs-tr>
                    <vs-td>
                    Florin Bucataru
                    </vs-td>
                    <vs-td>
                    150
                    </vs-td>
                    <vs-td>
<vs-select
            label-placeholder="Echipa"
            v-model="value2"
            >
                <vs-option label="Vuesax" value="1">
                Echipa Rosie 2/5
                </vs-option>
                <vs-option label="Vue" value="2">
                Vue
                </vs-option>
                <vs-option label="Javascript" value="3">
                Javascript
                </vs-option>
                <vs-option label="Sass" value="4">
                Sass
                </vs-option>
                <vs-option label="Typescript" value="5">
                Typescript
                </vs-option>
                <vs-option label="Webpack" value="6">
                Webpack
                </vs-option>
                <vs-option label="Nodejs" value="7">
                Nodejs
                </vs-option>
            </vs-select>
                    </vs-td>
                </vs-tr>
                </template>
            </vs-table>
        </div>
        <div>
        <vs-button
            block
        >
            <i class='bx bx-play' ></i>Start Campionat
        </vs-button>
        </div>
        {{$store.state.add_game}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            value2:"",
            game:{
                name:"",
                stadium:""
            }
        }
    },
    beforeMount(){
        this.$store.dispatch('getAddGame');
    }
}
</script>

<style lang="scss" scoped>
.app-game-add {
    padding: 2rem;

    &__input {
        margin: 1.5rem;
    }
}
</style>