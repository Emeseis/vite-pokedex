<template>  
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable margin-b7">
          <tbody>
            <tr>
              <h3>General Information</h3>
            </tr>
          </tbody>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr class="">
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
              <td class="">Base Exp.</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Base Friendship</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Abilities</td>
              <td>
                <span v-for="(ability, index) in pokemon.pokemonInfo.abilities" :key="index">
                  <v-chip 
                    class="mr-1" 
                    :class="ability.is_hidden ? 'pr-4' : ''" 
                    :append-icon="ability.is_hidden ? 'mdi-eye-off' : ''"
                    size="small"
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
        <table width="100%" class="customTable margin-b7">
          <tbody>
            <tr>
              <h3>Training & Breeding</h3>
            </tr>
          </tbody>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr>
              <td class="" width="40%">EV Yield</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Catch Rate</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Growth Rate</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Gender</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Egg Cycles</td>
              <td></td>
            </tr>
            <tr>
              <td class="">Egg Groups</td>
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
    line-height: 32px;
    font-size: 13px;
  }
  .margin-b7 {
    margin-bottom: 7px;
  }
</style>