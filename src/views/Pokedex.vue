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
  import { typeList } from '@/composables/lists';
  import axios from 'axios';
  import Loader from '@/components/Loader.vue';
  import FilterBar from '@/components/FilterBar.vue'
  import PokemonGrid from '@/components/PokemonGrid.vue';
  import TypeInfoModal from '@/components/TypeInfoModal.vue';
  import PokemonInfoModal from '@/components/PokemonInfoModal.vue';

  let searchLoading = ref(false);
  let pokemonList = ref([]);
  let pokemonListFiltered = ref([]);
  let typeDefenseList = ref({});

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
    if (name) pokemonListFiltered.value = pokemonList.value.filter(poke => {
      return poke.name.toLowerCase().includes(name.toLowerCase());
    });
    else pokemonListFiltered.value = pokemonList.value;
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
    const typeDefenses = await getMultipliers(pokemon);  
    
    const flavorText = pokemonMoreInfo.data.flavor_text_entries.filter(item => item.language.name == 'en');
    pokemonMoreInfo.data.flavor_text_entries = flavorText;
    
    const speciesName = pokemonMoreInfo.data.genera.filter(item => item.language.name == 'en');    
    pokemonMoreInfo.data.genera = speciesName;    

    const pokemonObject = { 
      pokemon,
      pokemonPrev: null,
      pokemonNext: null,
      info: pokemonInfo.data,
      moreInfo: pokemonMoreInfo.data,
      typeDefenses
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
  
  const getMultipliers = async (pokemon) => {    
    let defense = {};

    const pokemonType = pokemon.types.map(type => type.type.name.toLowerCase());

    for await (const type of typeList) defense[type.title.toLowerCase()] = 1;

    for await (const type of pokemonType) {
      let damageRelations = typeDefenseList.value[type];
      let noDamage = damageRelations.defense.zero;
      let halfDamage = damageRelations.defense.half;
      let doubleDamage = damageRelations.defense.double;

      noDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.0 });
      halfDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.5 });
      doubleDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 2.0 });
    }

    return defense;
  };
  
  onMounted(async () => {
    onSearch({ filterName: '', type: 'All', gen: 'All', order: '1' });
    const types = await axios.get(`${import.meta.env.VITE_API_URL}/types`);
    typeDefenseList.value = types.data;
  });
</script>
