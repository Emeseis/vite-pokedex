<template>  
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable mb-4">
          <tbody>
            <tr>
              <td>
                <h3>General Information</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr>
              <td class="" width="20%">Species</td>
              <td>{{ pokemon.pokemonMoreInfo.genera[0] ? pokemon.pokemonMoreInfo.genera[0].genus : 'None' }}</td>
            </tr>
            <tr>
              <td class="">Height</td>
              <td>{{ toFeetInch((pokemon.pokemonInfo.height/10)) }} ({{ (pokemon.pokemonInfo.height/10).toFixed(1) }} m)</td>
            </tr>
            <tr>
              <td class="">Weigth</td>
              <td>{{ ((pokemon.pokemonInfo.weight/10)*2.2046).toFixed(1) }} lbs ({{ (pokemon.pokemonInfo.weight/10).toFixed(1) }} kg)</td>
            </tr>
            <tr>
              <td class="">Abilities</td>
              <td>
                <span v-for="(ability, index) in pokemon.pokemonInfo.abilities" :key="index">
                  <v-chip 
                    class="mr-1" 
                    :class="ability.is_hidden ? 'pr-4' : ''" 
                    :append-icon="ability.is_hidden ? 'mdi-eye-off' : ''"
                  >
                    {{ capitalizeWord(ability.ability.name) }}
                  </v-chip>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable mb-4">
          <tbody>
            <tr>
              <td>
                <h3>Breeding</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr>
              <td class="" width="20%">Gender</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Egg Groups</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Egg Cycles</td>
              <td></td>
            </tr>
            <tr>
              <td class="">ㅤ</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import { toFeetInch, capitalizeWord } from '@/composables/functions';

  const props = defineProps({ pokemon: Object });
</script>

<style scoped>
  .customTable {
    border-radius: 24px;
    padding: 0 16px;
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .customTable tr {
    line-height: 44px;
  }
</style>