<template>
  <v-dialog v-model="visible" width="1244" style="margin: 160px 24px 24px 24px !important;">
    <div class="px-6 py-6 rounded-xl text-center bg-white elevation-2" style="height: 708px">
      <!-- <v-carousel 
        style="margin: -204px auto 0; height: 360px;" 
        hide-delimiters 
        class="d-flex justify-center"
        :show-arrows="props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_shiny ? true : false"
      >
        <v-carousel-item
          :src="props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_default"
          height="360"
          width="480"
        ></v-carousel-item>
        <v-carousel-item
          v-if="props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_shiny"
          :src="props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_shiny"
          height="360"
          width="480"
        ></v-carousel-item>
      </v-carousel> -->
      <v-img
        :src="Artwork"
        height="360"
        width="360"
        style="margin: -204px auto 0;"
      ></v-img>
      <v-row style="margin: -160px 0 64px;">
        <div v-if="pokemon.pokemonPrev">
          <v-btn
            @click="emit('onPokemonClicked', pokemon.pokemonPrev);"
            class="font-weight-black pr-8"
            prepend-icon="mdi-chevron-left"
            rounded="xl"
            size="large"
            color="#EEE"
            height="96px"
          >
            <v-img
              :src="pokemon.pokemonPrev.sprite"
              class="mr-2 ml-n2"
              width="64"
              height="64"
            ></v-img>
            <div>
              <div class="font-weigth-bold text-grey-darken-1 mb-2">
                #{{ pokemon.pokemonPrev.entry }}
              </div>
              <div>
                {{ pokemon.pokemonPrev.name }}
              </div>
            </div>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div v-if="pokemon.pokemonNext">
          <v-btn
            @click="$emit('onPokemonClicked', pokemon.pokemonNext)"
            class="font-weight-black pl-8"
            append-icon="mdi-chevron-right"
            rounded="xl"
            size="large"
            color="#EEE"
            height="96px"
          >
            <div>
              <div class="font-weigth-bold text-grey-darken-1 mb-2">
                #{{ pokemon.pokemonNext.entry }}
              </div>
              <div>
                {{ pokemon.pokemonNext.name }}
              </div>
            </div>
            <v-img
              :src="pokemon.pokemonNext.sprite"
              class="ml-2 mr-n2"
              width="64"
              height="64"
            ></v-img>
          </v-btn>
        </div>
      </v-row>
      <div class="text-h5 font-weight-black text-grey-darken-1">
        #{{ props.pokemon.pokemon.entry }}
      </div>
      <div class="text-h4 font-weight-black text-black mt-3">
        <span v-if="props.pokemon.pokemon.name.includes('♂')">
          {{ props.pokemon.pokemon.name.replace('♂', '') }}
          <v-icon size="x-small" class="mt-n1 ml-n1">mdi-gender-male</v-icon>
        </span>
        <span v-else-if="props.pokemon.pokemon.name.includes('♀')">
          {{ props.pokemon.pokemon.name.replace('♀', '') }}
          <v-icon size="x-small" class="mt-n1 ml-n1">mdi-gender-female</v-icon>
        </span>
        <span v-else>
          {{ props.pokemon.pokemon.name }}
        </span>
      </div>
      <div class="mt-4">
        <type-chip
          size="x-large"
          :type="props.pokemon.pokemon.types[0].type.name"
        ></type-chip>
        <type-chip
          v-if="props.pokemon.pokemon.types[1]"
          class="ml-2"
          size="x-large"
          :type="props.pokemon.pokemon.types[1].type.name"
        ></type-chip>
      </div>      
      <v-card class="rounded-xl elevation-2 mt-4">
        <v-toolbar height="64" floating color="#EEE"  show-arrows>
          <v-tabs v-model="state.tab" grow>
            <v-tab value="about" class="font-weight-black">
              About
            </v-tab>
            <v-tab value="stats" class="font-weight-black">
              Base Stats
            </v-tab>
            <v-tab value="evolve" class="font-weight-black">
              Evolution
            </v-tab>
            <v-tab value="moves" class="font-weight-black">
              Moves
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-window v-model="state.tab" class="mt-n2" style="height: 280px;">
          <v-window-item value="about">
            <v-card color="#EEE" height="280px">
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
                        <td class="text-grey-darken-1" width="20%">Species</td>
                        <td>{{ pokemon.pokemonMoreInfo.genera[0] ? pokemon.pokemonMoreInfo.genera[0].genus : 'None' }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">Height</td>
                        <td>{{ toFeetInch((pokemon.pokemonInfo.height/10)) }} ({{ (pokemon.pokemonInfo.height/10).toFixed(1) }} m)</td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">Weigth</td>
                        <td>{{ ((pokemon.pokemonInfo.weight/10)*2.2046).toFixed(1) }} lbs ({{ (pokemon.pokemonInfo.weight/10).toFixed(1) }} kg)</td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">Abilities</td>
                        <td>
                          <span v-for="(ability, index) in pokemon.pokemonInfo.abilities" :key="index">
                            <v-chip class="mr-1" :append-icon="ability.is_hidden ? 'mdi-eye-off' : ''">
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
                        <td class="text-grey-darken-1" width="20%">Gender</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">Egg Groups</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">Egg Cycles</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="text-grey-darken-1">ㅤ</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-card>
          </v-window-item>
          <v-window-item value="stats">
            <v-card color="#EEE" height="280px">
        
            </v-card>
          </v-window-item>
          <v-window-item value="evolve">
            <v-card color="#EEE" height="280px">
        
            </v-card>
          </v-window-item>
          <v-window-item value="moves">
            <v-card color="#EEE" height="280px">
        
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </v-dialog>
</template>

<script setup>
  import TypeChip from '@/components/TypeChip.vue';
  import { computed, reactive } from 'vue';
  import { toFeetInch, capitalizeWord } from '@/composables/functions'

  const emit = defineEmits(['toggleDialog', 'onPokemonClicked']);

  const props = defineProps({
    showDialog: Boolean,
    pokemon: Object
  });

  const visible = computed({
    get: () => props.showDialog,
    set: (newVal) => emit('toggleDialog', newVal)
  });

  const Artwork = computed(() => props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_default);
  // const Artwork2 = computed(() => props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_shiny);

  const state = reactive({ tab: 'about' });
</script>

<style scoped>
  .gender-char {
    font-family: 'Franklin Gothic Medium' !important;
    font-size: 5rem !important;
    font-weight: 900 !important;
  }
  .vertical-header {
    color: #737373;
    text-align: right;
    font-size: 0.875rem !important;
  }
  .card-title {
    font-weight: 900;
    font-size: 18px !important;
  }
  .card-content {
    font-size: 18px;
  }
  :deep(.v-btn .v-icon) {
    --v-icon-size-multiplier: 1.2 !important;
  }
  .v-btn--elevated:hover, .v-btn--elevated:focus { 
    /* substituido a sombra de hover e focus do v-btn pela sobra padrão do v-btn */
    box-shadow: 
      0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 
      0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 
      0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }
  .customTable {
    background-color: white;
    border-radius: 24px;
    padding: 0 16px;
  }
  .customTable tr {
    line-height: 44px;
  }
</style>