<template>  
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="customHeader margin-b7">
          <tr><h3>General Information</h3></tr>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr>
              <td width="25%">Species</td>
              <td>
                {{ pokemon.moreInfo.genera[0] ? pokemon.moreInfo.genera[0].genus : 'None' }}
              </td>
            </tr>
            <tr>
              <td>Height</td>
              <td>
                {{ toFeetInch((pokemon.info.height/10)) }}
                ({{ (pokemon.info.height/10).toFixed(1) }} m)
              </td>
            </tr>
            <tr>
              <td>Weigth</td>
              <td>
                {{ ((pokemon.info.weight/10)*2.2046).toFixed(1) }} lbs
                ({{ (pokemon.info.weight/10).toFixed(1) }} kg)
              </td>
            </tr>
            <tr>
              <td>Abilities</td>
              <td>
                <span v-for="(ability, index) in pokemon.info.abilities" :key="index">
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
            <tr>
              <td>Base Friendship</td>
              <td>
                {{ pokemon.moreInfo.base_happiness }}
                <span v-if="pokemon.moreInfo.base_happiness <  50">(lower than normal)</span>
                <span v-if="pokemon.moreInfo.base_happiness == 50">(normal)</span>
                <span v-if="pokemon.moreInfo.base_happiness >  50">(higher than normal)</span>
              </td>
            </tr>
            <tr>
              <td>Base Exp.</td>
              <td>{{ pokemon.info.base_experience }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="6" class="text-left">
        <table width="100%" class="customHeader margin-b7">
          <tr><h3>Training & Breeding</h3></tr>
        </table>
        <table width="100%" class="customTable">
          <tbody>
            <tr>
              <td width="25%">Catch Rate</td>
              <td>
                {{ pokemon.moreInfo.capture_rate }}
                ({{ Math.round((pokemon.moreInfo.capture_rate*0.130719)*10)/10 }}% with PokéBall, full HP)                
              </td>
            </tr>
            <tr>
              <td>Growth Rate</td>
              <td>{{ growth_rate }}</td>
            </tr>
            <tr>
              <td>EV Yield</td>
              <td>
                <v-chip
                  v-for="ev in ev_yield"
                  size="small"
                  class="mr-1"
                >
                  {{ ev }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>                
                <v-chip 
                  v-if="pokemon.moreInfo.gender_rate != -1" 
                  color="blue-lighten-2"
                  size="small"
                  class="mr-1"
                >
                  {{ (8-pokemon.moreInfo.gender_rate)*12.5 }}% male
                </v-chip>
                <v-chip 
                  v-if="pokemon.moreInfo.gender_rate != -1" 
                  color="pink-lighten-2"
                  size="small"
                > 
                  {{ pokemon.moreInfo.gender_rate*12.5 }}% female
                </v-chip>
                <v-chip v-else color="white" size="small">Genderless</v-chip>
              </td>
            </tr>
            <tr>
              <td>Egg Groups</td>
              <td>
                <v-chip size="small" class="mr-1">
                  {{ capitalizeWord(pokemon.moreInfo.egg_groups[0].name) }}
                </v-chip>
                <v-chip v-if="pokemon.moreInfo.egg_groups[1]" size="small">
                  {{ capitalizeWord(pokemon.moreInfo.egg_groups[1].name) }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Egg Cycles</td>
              <td>
                {{ pokemon.moreInfo.hatch_counter }}
                ({{ (pokemon.moreInfo.hatch_counter*257-256).toLocaleString('en') }} –
                {{ (pokemon.moreInfo.hatch_counter*257).toLocaleString('en') }} steps)
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue';
  import { toFeetInch, capitalizeWord } from '@/composables/functions';

  const props = defineProps({ pokemon: Object });
  
  const growth_rate = computed(() => {
    switch (props.pokemon.moreInfo.growth_rate.name) {
      case 'slow': return 'Slow';
      case 'slow-then-very-fast': return 'Erratic';
      case 'medium': return 'Medium';
      case 'medium-slow': return 'Medium Slow';
      case 'fast': return 'Fast';
      case 'fast-then-very-slow': return 'Fluctuating';
      default: return 'None';
    }
  });

  const ev_yield = computed(() => {
    let EVs = [];
    if (props.pokemon.info.stats[0].effort) EVs.push(`${props.pokemon.info.stats[0].effort} HP`);
    if (props.pokemon.info.stats[1].effort) EVs.push(`${props.pokemon.info.stats[1].effort} Attack`);
    if (props.pokemon.info.stats[2].effort) EVs.push(`${props.pokemon.info.stats[2].effort} Defense`);
    if (props.pokemon.info.stats[3].effort) EVs.push(`${props.pokemon.info.stats[3].effort} Special Attack`);
    if (props.pokemon.info.stats[4].effort) EVs.push(`${props.pokemon.info.stats[4].effort} Special Defense`);
    if (props.pokemon.info.stats[5].effort) EVs.push(`${props.pokemon.info.stats[5].effort} Speed`);
    return EVs;
  });
</script>

<style scoped>
  .customTable {
    border-radius: 24px;
    padding: 2px 16px;
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