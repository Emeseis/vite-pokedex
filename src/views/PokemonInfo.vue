<template>
  <div class="text-center" v-if="!isLoading">
    <v-progress-linear
      v-show="isLoading"
      indeterminate
      color="red"
      height="8"
      class="mt-n6 mb-4"
      style="width: 1244px;"
    ></v-progress-linear>
    <v-row no-gutters justify="space-between" style="position: sticky; top: 164px;">
      <v-btn
        v-if="store.pokemonObjectClicked.pokemonPrev"
        @click="onPokemonNavigate(store.pokemonObjectClicked.pokemonPrev)"
        class="font-weight-black pr-8"
        prepend-icon="mdi-chevron-left"
        rounded="xl"
        size="large"
        height="96px"
        :disabled="isLoading"
      >
        <v-img
          width="64"
          height="64"
          class="mr-2 ml-n2"
          :src="`/pokemon-sprites/${store.pokemonObjectClicked.pokemonPrev.id}.png`"
        ></v-img>
        <div>
          <div class="font-weigth-bold entry-text-btn mb-2">
            #{{ store.pokemonObjectClicked.pokemonPrev.entry }}
          </div>
          <div>
            {{ store.pokemonObjectClicked.pokemonPrev.label }}
          </div>
        </div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="store.pokemonObjectClicked.pokemonNext"
        @click="onPokemonNavigate(store.pokemonObjectClicked.pokemonNext)"
        class="font-weight-black pl-8"
        append-icon="mdi-chevron-right"
        rounded="xl"
        size="large"
        height="96px"
        :disabled="isLoading"
      >
        <div>
          <div class="font-weigth-bold entry-text-btn mb-2">
            #{{ store.pokemonObjectClicked.pokemonNext.entry }}
          </div>
          <div>
            {{ store.pokemonObjectClicked.pokemonNext.label }}
          </div>
        </div>
        <v-img
          width="64"
          height="64"
          class="ml-2 mr-n2"
          :src="`/pokemon-sprites/${store.pokemonObjectClicked.pokemonNext.id}.png`"
        ></v-img>
      </v-btn>
    </v-row>
    <v-row no-gutters justify="center" style="margin-top: -96px;">
      <v-btn icon class="invisible"></v-btn>
      <v-img
        width="270"
        height="270"
        class="artwork ma-0"
        :src="artwork"
      ></v-img>
      <v-btn icon @click="showShiny = !showShiny">
        <template #default>
          <v-icon class="ml-n1" :color="showShiny ? 'yellow-darken-1' : 'on-surface'">
            {{ showShiny ? 'mdi-creation' : 'mdi-creation-outline' }}
          </v-icon>
        </template>
      </v-btn>
    </v-row>
    <div>
      <div class="font-weight-black entry-text mt-2">
        #{{ store.pokemonObjectClicked.pokemon.entry }}
      </div>
      <div class="text-h4 font-weight-black mt-2">
        {{ store.pokemonObjectClicked.pokemon.label }}
      </div>
      <div class="mt-4">
        <TypeChip
          size="x-large"
          :type="store.pokemonObjectClicked.pokemon.types[0].type.name"
          @onTypeClicked="onTypeClicked(store.pokemonObjectClicked.pokemon.types[0].type.name)"
        />
        <TypeChip
          class="ml-2"
          size="x-large"
          v-if="store.pokemonObjectClicked.pokemon.types[1]"
          :type="store.pokemonObjectClicked.pokemon.types[1].type.name"
          @onTypeClicked="onTypeClicked(store.pokemonObjectClicked.pokemon.types[1].type.name);"
        />
      </div>
    </div>
    <v-card class="rounded-xl elevation-2 my-6">
      <v-toolbar height="64" floating  show-arrows>
        <v-tabs v-model="tab" grow>
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
      <v-window v-model="tab" style="height: 280px; margin-top: -7px">
        <v-window-item value="about">
          <AboutTab :pokemon="store.pokemonObjectClicked"/>
        </v-window-item>
        <v-window-item value="stats">
          <StatsTab :pokemon="store.pokemonObjectClicked" @onTypeClicked="onTypeClicked"/>
        </v-window-item>
        <v-window-item value="evolve">
          <EvolutionTab :pokemon="store.pokemonObjectClicked"/>
        </v-window-item>
        <v-window-item value="moves">
          <MovesTab :pokemon="store.pokemonObjectClicked"/>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
  <Loader :loading="isLoading"/>
</template>

<script setup>
  import Loader from '@/components/Loader.vue';
  import TypeChip from '@/components/TypeChip.vue';
  import AboutTab from '@/components/PokemonInfo/AboutTab.vue';
  import MovesTab from '@/components/PokemonInfo/MovesTab.vue';
  import StatsTab from '@/components/PokemonInfo/StatsTab.vue';
  import EvolutionTab from '@/components/PokemonInfo/EvolutionTab.vue';

  const store = useStore();
  const router = useRouter();

  let tab = ref('about');
  let isLoading = ref(true);
  let showShiny = ref(false);

  onMounted(() => Object.keys(store.pokemonObjectClicked).length > 0 ? isLoading.value = false : isLoading.value = true);
  watch(() => store.pokemonObjectClicked, () => isLoading.value = false);
  onUnmounted(() => store.pokemonObjectClicked = {});

  const onTypeClicked = (type) => {
    console.log(type);
  };

  const onPokemonNavigate = (pokemon) => {
    isLoading.value = true;
    router.push(`/pokedex/${pokemon.name}`);
  };

  const artwork = computed(() => { 
    if (showShiny.value) return store.pokemonObjectClicked.pokemonInfo.sprites.other['official-artwork'].front_shiny;
    else return store.pokemonObjectClicked.pokemonInfo.sprites.other['official-artwork'].front_default;
  });
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