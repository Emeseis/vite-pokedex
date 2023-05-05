<template>
  <v-row class="mt-6 justify-center"> <!-- justify-space-evenly -->
    <v-col cols="2">
      <v-card class="rounded-xl elevation-2">
        <v-text-field
          hideDetails
          clearable
          label="Name"
          bgColor="white"
          prependInnerIcon="mdi-text-search"
          v-model="params.name"
          @update:modelValue="onSearch"
        ></v-text-field>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Type"
          bgColor="white"
          :menuProps="{ contentClass: 'v-select-custom-menu' }" 
          :items="typeList"
          v-model="params.type"
          @update:modelValue="onSearch"
        >
          <template v-slot:prepend-inner>
            <v-icon :color="getColor(params.type)">
              {{ typeList[typeList.findIndex(item => item.title == params.type)].icon }}
            </v-icon>
          </template>
          <template v-slot:item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
            >
              <template v-slot:prepend>
                <v-icon :color="getColor(item.raw.title)">
                  {{ item.raw.icon }}
                </v-icon>
              </template>
            </v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Generation"
          bgColor="white"
          :prependInnerIcon="genList[genList.findIndex(item => item.value == params.gen)].icon"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="genList"
          v-model="params.gen"
          @update:modelValue="onSearch"
        >
          <template v-slot:item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
              :prependIcon="item.raw.icon"
            ></v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Order"
          bgColor="white"
          :prependInnerIcon="orderList[orderList.findIndex(item => item.value == params.order)].icon"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="orderList"
          v-model="params.order"
          @update:modelValue="onSearch"
        >
          <template v-slot:item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
              :prependIcon="item.raw.icon"
            ></v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="rounded-xl elevation-2" height="56">
        <v-pagination
          v-model="page"
          rounded="xl"
          size="47"
          :length="pokemonListLength"          
          :total-visible="pokemonListLength == 5 ? 5 : 4"
          @update:model-value="pokemonListSlice"
        ></v-pagination>
      </v-card>
    </v-col>
  </v-row>
  <loader
    :loading="isLoading"
  ></loader>
  <pokemon-grid
    :pokemonList="pokemonListSliced"
    @onPokemonClicked="onPokemonClicked"
  ></pokemon-grid>
  <pokemon-info-modal
    :showDialog="isPokemonInfoModal"
    :pokemon="pokemonClicked"
    @toggleDialog="isPokemonInfoModal = false"
    @onPokemonClicked="onPokemonClicked"
  ></pokemon-info-modal>
</template>

<script setup>
  import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
  import { typeList, genList, orderList } from '@/composables/lists'
  import { getColor } from '@/composables/functions'
  import PokemonGrid from '@/components/PokemonGrid.vue';
  import PokemonInfoModal from '@/components/PokemonInfoModal.vue';
  import Loader from '@/components/Loader.vue';
  import axios from 'axios';

  let page = ref(1);
  
  let pokemonList = ref({ pokemons: [] });

  let pokemonListSliced = ref(null);

  let pokemonsPerPage = ref(null);

  const pokemonListSlice = () => {
    let paginationStart = (page.value - 1) * pokemonsPerPage.value;
    let paginationEnd = page.value * pokemonsPerPage.value;
    pokemonListSliced.value = pokemonList.value.pokemons.slice(paginationStart, paginationEnd);
  };

  let params = reactive({
    name: '',
    order: '1',
    gen: 'All',
    type: 'All',
    from: '',
    to: '',
  });

  let pokemonListLength = ref(null);

  let isLoading = ref(true);

  const onSearch = async () => {
    pokemonsPerPage.value = screen.height >= 1440 ? 30 : screen.height >= 1080 ? 24 : 18;
    page.value = 1;
    try {
      const pokemons = await axios.post(`https://node-pokedex-api.onrender.com/pokemons`, params); 
      pokemonList.value.pokemons = pokemons.data.pokemons;
      pokemonListLength.value = Math.ceil(pokemonList.value.pokemons.length / pokemonsPerPage.value);
      pokemonListSlice();
      isLoading.value = false;
    } catch (err) {
      console.error(err);
      isLoading.value = false;
    }
  };

  let isPokemonInfoModal = ref(false);

  let pokemonClicked = ref(null);

  const fetchPokemon = async (pokemon) => {
    const baseUrl = `https://pokeapi.co/api/v2`;
    const pokemonInfo = await axios.get(`${baseUrl}/pokemon/${pokemon.id}`);
    const pokemonMoreInfo = await axios.get(`${baseUrl}/pokemon-species/${pokemon.id}`);
       
    pokemonMoreInfo.data.flavor_text_entries = 
    pokemonMoreInfo.data.flavor_text_entries.filter(item => item.language.name == 'en');

    pokemonMoreInfo.data.genera = 
    pokemonMoreInfo.data.genera.filter(item => item.language.name == 'en');
    

    const pokemonObject = { pokemon, pokemonInfo: pokemonInfo.data, pokemonMoreInfo: pokemonMoreInfo.data };

    if (pokemon.id != 1) {
      const idPrev = (pokemon.id - 1);
      const pokemonPrev = await axios.get(`https://node-pokedex-api.onrender.com/pokemon/${idPrev}`);
      pokemonObject.pokemonPrev = pokemonPrev.data;
    }

    if (pokemon.id != 1010) {
      const idNext = (pokemon.id + 1);
      const pokemonNext = await axios.get(`https://node-pokedex-api.onrender.com/pokemon/${idNext}`);
      pokemonObject.pokemonNext = pokemonNext.data;
    }
    console.log(pokemonObject);
    console.log(pokemonObject.pokemonInfo.sprites.other['official-artwork'].front_shiny)
    return pokemonObject;
  };

  const onPokemonClicked = async (pokemon) => {
    isLoading.value = true;    
    pokemonClicked = await fetchPokemon(pokemon);
    isLoading.value = false;
    isPokemonInfoModal.value = true;
  };

  const onWindowsResize = () => {
    pokemonsPerPage.value = screen.height >= 1440 ? 30 : screen.height >= 1080 ? 24 : 18;
    pokemonListLength.value = parseInt((pokemonList.value.pokemons.length / pokemonsPerPage.value) + 1);
    if (pokemonsPerPage.value == 30 && page.value > 34) page.value = 34;
    pokemonListSlice();
  };

  onBeforeMount(() => { window.addEventListener("resize", onWindowsResize); });

  onMounted(() => { onSearch(); });

  onBeforeUnmount(() => { window.removeEventListener("resize", onWindowsResize); });
</script>

<style>
  .v-select-custom-menu {
    border-radius: 24px !important;
    max-height: 75vh !important;
  }
  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .v-pagination__prev > button, .v-pagination__next > button {
    border: 1px inset black
  }
</style>

<style scoped>
  :deep(.v-field__prepend-inner > .v-icon) {
    opacity: 1;
  }
  :deep(.v-list-item__prepend > .v-icon) {
    opacity: 1;
  }
</style>
