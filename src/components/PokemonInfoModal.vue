<template>
  <v-dialog v-model="visible" width="1244">
    <v-card class="text-center rounded-xl pa-6" color="background">
      <div class="div-for-scroll">
        <v-progress-linear
          v-show="isLoading"
          indeterminate
          color="red"
          height="8"
          class="mt-n6 mb-4"
          style="width: 1244px;"
        ></v-progress-linear>
        <v-row no-gutters justify="space-between">
          <v-btn
            v-if="pokemon.pokemonPrev"
            @click="onPokemonPrev"
            class="font-weight-black pr-8"
            prepend-icon="mdi-chevron-left"
            rounded="xl"
            size="large"
            height="96px"
            :disabled="isLoading"
          >
            <v-img
              :src="pokemon.pokemonPrev.sprite"
              class="mr-2 ml-n2"
              width="64"
              height="64"
            ></v-img>
            <div>
              <div class="font-weigth-bold entry-text-btn mb-2">
                #{{ pokemon.pokemonPrev.entry }}
              </div>
              <div>
                {{ pokemon.pokemonPrev.name }}
              </div>
            </div>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="pokemon.pokemonNext"
            @click="onPokemonNext"
            class="font-weight-black pl-8"
            append-icon="mdi-chevron-right"
            rounded="xl"
            size="large"
            height="96px"
            :disabled="isLoading"
          >
            <div>
              <div class="font-weigth-bold entry-text-btn mb-2">
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
        </v-row>
        <v-row no-gutters justify="center" style="margin-top: -96px;">
          <v-btn
            icon
            class="invisible"
          ></v-btn>
          <v-img
            :src="artwork"
            height="270"
            width="270"
            class="artwork ma-0"
          ></v-img>
          <v-btn
            :icon="!showShiny ? 'mdi-star' : 'mdi-star-off'"
            @click="showShiny = !showShiny"
          ></v-btn>
        </v-row>
        <div>
          <div class="font-weight-black entry-text mt-2">
            #{{ pokemon.pokemon.entry }}
          </div>
          <div class="text-h4 font-weight-black mt-2">
            {{ pokemon.pokemon.name }}
          </div>
          <div class="mt-4">
            <TypeChip
              size="x-large"
              :type="pokemon.pokemon.types[0].type.name"
              @onTypeClicked="emit('onTypeClicked', pokemon.pokemon.types[0].type.name);"
            />
            <TypeChip
              class="ml-2"
              size="x-large"
              v-if="pokemon.pokemon.types[1]"
              :type="pokemon.pokemon.types[1].type.name"
              @onTypeClicked="emit('onTypeClicked', pokemon.pokemon.types[1].type.name);"
            />
          </div>
        </div>
        <v-card class="rounded-xl elevation-2 mt-6">
          <v-toolbar height="64" floating  show-arrows>
            <v-tabs v-model="state.tab" grow>
              <v-tab value="about" class="font-weight-black">
                About
              </v-tab>
              <v-tab value="stats" class="font-weight-black">
                Stats
              </v-tab>
              <v-tab value="evolve" class="font-weight-black">
                Evolution
              </v-tab>
              <v-tab value="moves" class="font-weight-black">
                Moves
              </v-tab>
            </v-tabs>
          </v-toolbar>
          <v-window v-model="state.tab" style="height: 280px; margin-top: -7px">
            <v-window-item value="about">
              <AboutTab :pokemon="pokemon"/>
            </v-window-item>
            <v-window-item value="stats">
              <StatsTab :pokemon="pokemon" @onTypeClicked="onTypeClicked"/>
            </v-window-item>
            <v-window-item value="evolve">
              <EvolutionTab :pokemon="pokemon"/>
            </v-window-item>
            <v-window-item value="moves">
              <MovesTab :pokemon="pokemon"/>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import TypeChip from '@/components/TypeChip.vue';
  import AboutTab from '@/components/PokemonInfoTabs/AboutTab.vue';
  import MovesTab from '@/components/PokemonInfoTabs/MovesTab.vue';
  import StatsTab from '@/components/PokemonInfoTabs/StatsTab.vue';
  import EvolutionTab from '@/components/PokemonInfoTabs/EvolutionTab.vue';

  const emit = defineEmits(['toggleDialog', 'onPokemonClicked', 'onTypeClicked']);

  const props = defineProps({
    showDialog: Boolean,
    pokemon: Object
  });

  const visible = computed({
    get: () => props.showDialog,
    set: (newVal) => emit('toggleDialog', newVal)
  });

  watch(() => props.pokemon, () => { 
    isLoading.value = false;
    showShiny.value = false;
  });

  const onTypeClicked = (type) => emit('onTypeClicked', type);

  let isLoading = ref(false);

  const onPokemonPrev = () => {
    isLoading.value = true;
    emit('onPokemonClicked', props.pokemon.pokemonPrev, 'modal');
  };

  const onPokemonNext = () => {
    isLoading.value = true;
    emit('onPokemonClicked', props.pokemon.pokemonNext, 'modal');
  };

  let showShiny = ref(false);

  const artwork = computed(() => { 
    if (showShiny.value) return props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_shiny;
    else return props.pokemon.pokemonInfo.sprites.other['official-artwork'].front_default;
  });

  const state = reactive({ tab: 'about' });
</script>

<style scoped>
  .skeleton-prev-next {
    height: 96px !important;
  }
  .skeleton-artwork {
    width: 270px !important;
  }
  .gender-char {
    font-family: 'Franklin Gothic Medium' !important;
    font-size: 5rem !important;
    font-weight: 900 !important;
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
  .v-responsive {
    flex: 0 0 auto;
  }
  .invisible {
    visibility: hidden !important;
  }
  .artwork {
    margin-bottom: -96px;
  }
  .entry-text-btn {
    font-size: 0.8rem !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
  .entry-text {
    font-size: 1.5rem !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>