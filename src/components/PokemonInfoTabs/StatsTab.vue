<template>
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="statTable">
          <tbody>
            <tr>
              <td class="font-weight-bold">Total</td>
              <td class="font-weight-bold">{{ totalStat }}</td>
              <td class="pr-4"></td>
              <td class="font-weight-bold">Min</td>
              <td class="font-weight-bold">Max</td>
            </tr>
            <tr>
              <td width="13%">HP</td>
              <td width="7%">{{ pokemon.pokemonInfo.stats[0].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[0].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[0].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td width="8%" class="text-left">{{ getStatMin(pokemon.pokemonInfo.stats[0].base_stat) }}</td>
              <td width="5%" class="text-left">{{ getStatMax(pokemon.pokemonInfo.stats[0].base_stat) }}</td>
            </tr>
            <tr>
              <td>Attack</td>
              <td>{{ pokemon.pokemonInfo.stats[1].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[1].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[1].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.pokemonInfo.stats[1].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.pokemonInfo.stats[1].base_stat) }}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{{ pokemon.pokemonInfo.stats[2].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[2].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[2].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.pokemonInfo.stats[2].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.pokemonInfo.stats[2].base_stat) }}</td>
            </tr>
            <tr>
              <td>Sp. Atk</td>
              <td>{{ pokemon.pokemonInfo.stats[3].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[3].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[3].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.pokemonInfo.stats[3].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.pokemonInfo.stats[3].base_stat) }}</td>
            </tr>
            <tr>
              <td>Sp. Def</td>
              <td>{{ pokemon.pokemonInfo.stats[4].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[4].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[4].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.pokemonInfo.stats[4].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.pokemonInfo.stats[4].base_stat) }}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{{ pokemon.pokemonInfo.stats[5].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.pokemonInfo.stats[5].base_stat)"
                  :color="getStatColor(pokemon.pokemonInfo.stats[5].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.pokemonInfo.stats[5].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.pokemonInfo.stats[5].base_stat) }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="6" class="text-left">
        <table width="100%" class="customHeader margin-b7">
          <tr><h3>Type Defenses</h3></tr>
        </table>
        <table class="customTable">
          <tr v-for="row in 3">
            <td 
              v-for="item in store.typeList.slice(row*6-5, row*6+1)" 
              :style="{ padding: row == 2 ? '2px 0' : '0' }" 
              width="1%"
            >
              <TypeDefenseChip
                @onTypeClicked="onTypeClicked"
                :effectiveness="props.pokemon.typeDefenses[item.title.toLowerCase()]" 
                :type="item.title"
              />
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue';
  import TypeDefenseChip from '../TypeDefenseChip.vue';

  const store = useStore();

  const emit = defineEmits(['onTypeClicked']);

  const props = defineProps({ pokemon: Object });

  const totalStat = computed(() => {
    return (
      props.pokemon.pokemonInfo.stats[0].base_stat +
      props.pokemon.pokemonInfo.stats[1].base_stat +
      props.pokemon.pokemonInfo.stats[2].base_stat +
      props.pokemon.pokemonInfo.stats[3].base_stat +
      props.pokemon.pokemonInfo.stats[4].base_stat +
      props.pokemon.pokemonInfo.stats[5].base_stat
    );
  });

  const onTypeClicked = (type) => emit('onTypeClicked', type);

  const getStatPercentage = (value) => (value*100)/180;

  const getStatMin = (value) => Math.floor((value*2+5)*0.9);

  const getStatMax = (value) => Math.floor((value*2+99)*1.1);
  
  const getStatColor = (value) => {
    if (value <= 29) return '#f34444b3';
    if (value <= 59) return '#ff7f0fb3';
    if (value <= 89) return '#ffdd57b3';
    if (value <= 119) return '#a0e515b3';
    if (value <= 149) return '#23cd5eb3';
    return '#00c2b8b3';
  };
</script>

<style scoped>
  .statTable {
    border-radius: 24px;
    padding: 4px 16px;
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .statTable tr {
    line-height: 32px;
    font-size: 13px;
  }
  .customTable {
    border-radius: 24px;
    padding: 6px;
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .customTable tr {
    line-height: 32px;
    font-size: 13px;
  }
  .customHeader {
    border-radius: 24px;
    padding: 0 16px;
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .customHeader tr {
    line-height: 28px;
    font-size: 13px;
  }
  .margin-b7 {
    margin-bottom: 7px;
  }
</style>