<template>
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable py-1">
          <tbody>
            <tr>
              <td width="13%">HP</td>
              <td width="7%">{{ pokemon.info.stats[0].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[0].base_stat)"
                  :color="getStatColor(pokemon.info.stats[0].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td width="8%" class="text-left">{{ getStatMin(pokemon.info.stats[0].base_stat) }}</td>
              <td width="5%" class="text-left">{{ getStatMax(pokemon.info.stats[0].base_stat) }}</td>
            </tr>
            <tr>
              <td>Attack</td>
              <td>{{ pokemon.info.stats[1].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[1].base_stat)"
                  :color="getStatColor(pokemon.info.stats[1].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.info.stats[1].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.info.stats[1].base_stat) }}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{{ pokemon.info.stats[2].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[2].base_stat)"
                  :color="getStatColor(pokemon.info.stats[2].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.info.stats[2].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.info.stats[2].base_stat) }}</td>
            </tr>
            <tr>
              <td>Sp. Atk</td>
              <td>{{ pokemon.info.stats[3].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[3].base_stat)"
                  :color="getStatColor(pokemon.info.stats[3].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.info.stats[3].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.info.stats[3].base_stat) }}</td>
            </tr>
            <tr>
              <td>Sp. Def</td>
              <td>{{ pokemon.info.stats[4].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[4].base_stat)"
                  :color="getStatColor(pokemon.info.stats[4].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.info.stats[4].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.info.stats[4].base_stat) }}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{{ pokemon.info.stats[5].base_stat }}</td>
              <td class="pr-4">
                <v-progress-linear
                  :model-value="getStatPercentage(pokemon.info.stats[5].base_stat)"
                  :color="getStatColor(pokemon.info.stats[5].base_stat)"
                  bg-color="white"
                  height="15"
                  rounded
                ></v-progress-linear>
              </td>
              <td>{{ getStatMin(pokemon.info.stats[5].base_stat) }}</td>
              <td>{{ getStatMax(pokemon.info.stats[5].base_stat) }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Total</td>
              <td class="font-weight-bold">{{ total_stat }}</td>
              <td class="pr-4"></td>
              <td class="font-weight-bold">Min</td>
              <td class="font-weight-bold">Max</td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="6" class="text-left">
        <table width="100%" class="customHeader margin-b7">
          <tr><h3>Type Defenses</h3></tr>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({ pokemon: Object });

  const total_stat = computed(() => {
    return (
      props.pokemon.info.stats[0].base_stat +
      props.pokemon.info.stats[1].base_stat +
      props.pokemon.info.stats[2].base_stat +
      props.pokemon.info.stats[3].base_stat +
      props.pokemon.info.stats[4].base_stat +
      props.pokemon.info.stats[5].base_stat
    );
  });

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
  .customTable {
    border-radius: 24px;
    padding: 0 16px;
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