<template>
  <Loader
    :loading="isLoading"
  />
  <FilterBar
    @onSearch="onSearch"
    @onFilterName="onFilterName"
  />
  <PokemonGrid
    :isLoading="searchLoading"
    :pokemonList="pokemonListFiltered"
    @onPokemonClicked="onPokemonClicked"
    @onTypeClicked="onTypeClicked"
  />
  <TypeInfoModal
    :showDialog="isTypeInfoModal"
    :type="typeClicked" 
    @toggleDialog="isTypeInfoModal = false"
  />
  <PokemonInfoModal
    :showDialog="isPokemonInfoModal"
    :pokemon="pokemonClicked"
    @toggleDialog="isPokemonInfoModal = false"
    @onPokemonClicked="onPokemonClicked"
    @onTypeClicked="onTypeClicked"
  />
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import Loader from '@/components/Loader.vue';
  import FilterBar from '@/components/FilterBar.vue'
  import PokemonGrid from '@/components/PokemonGrid.vue';
  import TypeInfoModal from '@/components/TypeInfoModal.vue';
  import PokemonInfoModal from '@/components/PokemonInfoModal.vue';
  import axios from 'axios';

  let searchLoading = ref(false);
  let pokemonList = ref([]);
  let pokemonListFiltered = ref([]);

  const onSearch = async (params) => {
    searchLoading.value = true;
    pokemonList.value = [];

    const pokemons = await axios.post(`${import.meta.env.VITE_API_URL}/pokemons`, params);
    pokemonList.value = pokemons.data.pokemons;

    if (params.filterName) onFilterName(params.filterName);
    else pokemonListFiltered.value = pokemonList.value;

    searchLoading.value = false;
  };

  const onFilterName = (name) => {
    pokemonListFiltered.value = pokemonList.value.filter(poke => {
      return poke.name.toLowerCase().includes(name.toLowerCase());
    })
  };

  let isLoading = ref(false);
  let pokemonClicked = ref(null);
  let isPokemonInfoModal = ref(false);

  const onPokemonClicked = async (pokemon, place) => {
    if (place !== 'modal') isLoading.value = true;
    pokemonClicked.value = await fetchPokemon(pokemon);
    isLoading.value = false;
    isPokemonInfoModal.value = true;
  };

  let typeClicked = ref(null);
  let isTypeInfoModal = ref(false);

  const onTypeClicked = (type, place) => {
    if (place !== 'modal') isLoading.value = true;
    typeClicked.value = type;
    isLoading.value = false;
    isTypeInfoModal.value = true;
  };

  const fetchPokemon = async (pokemon) => {
    const baseUrl = `https://pokeapi.co/api/v2`;
    const pokemonInfo = await axios.get(`${baseUrl}/pokemon/${pokemon.id}`);
    const pokemonMoreInfo = await axios.get(`${baseUrl}/pokemon-species/${pokemon.id}`);
    
    const flavorText = pokemonMoreInfo.data.flavor_text_entries.filter(item => item.language.name == 'en');
    pokemonMoreInfo.data.flavor_text_entries = flavorText;
    
    const speciesName = pokemonMoreInfo.data.genera.filter(item => item.language.name == 'en');    
    pokemonMoreInfo.data.genera = speciesName;    

    const pokemonObject = { 
      pokemon,
      pokemonPrev: null,
      pokemonNext: null,
      info: pokemonInfo.data,
      moreInfo: pokemonMoreInfo.data
    };

    if (pokemon.id != 1) {
      const idPrev = (pokemon.id - 1);
      const pokemonPrev = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${idPrev}`);
      pokemonObject.pokemonPrev = pokemonPrev.data;
    }

    if (pokemon.id != 1010) {
      const idNext = (pokemon.id + 1);
      const pokemonNext = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${idNext}`);
      pokemonObject.pokemonNext = pokemonNext.data;
    } 

    return pokemonObject;
  };
  
  onMounted(() => onSearch({ filterName: '', type: 'All', gen: 'All', order: '1' }));
</script>

<style scoped>

</style>
