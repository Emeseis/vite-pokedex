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
  import Loader from '@/components/Loader.vue';
  import FilterBar from '@/components/FilterBar.vue'
  import PokemonGrid from '@/components/PokemonGrid.vue';
  import TypeInfoModal from '@/components/TypeInfoModal.vue';
  import PokemonInfoModal from '@/components/PokemonInfoModal.vue';

  const store = useStore();

  let searchLoading = ref(false);
  let pokemonList = ref([]);
  let pokemonListFiltered = ref([]);

  const onSearch = async (params) => {
    searchLoading.value = true;
    pokemonList.value = [];
    pokemonList.value = (await axios.post(`${store.API_URL}/pokemons`, params)).data.pokemons;

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
    const typeDefenses = await getMultipliers(pokemon);  
    const pokemonInfo = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)).data;
    const pokemonSpecies = (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)).data;
    
    pokemonSpecies.flavor_text_entries = pokemonSpecies.flavor_text_entries.filter(item => item.language.name == 'en');
    pokemonSpecies.genera = pokemonSpecies.genera.filter(item => item.language.name == 'en');

    const pokemonObject = { 
      pokemon,
      pokemonInfo,
      pokemonSpecies,
      pokemonPrev: null,
      pokemonNext: null,
      typeDefenses
    };

    if (pokemon.id != 1) pokemonObject.pokemonPrev = (await axios.get(`${store.API_URL}/pokemon?id=${pokemon.id-1}`)).data;
    if (pokemon.id != 1010) pokemonObject.pokemonNext = (await axios.get(`${store.API_URL}/pokemon?id=${pokemon.id+1}`)).data;

    return pokemonObject;
  };
  
  const getMultipliers = async (pokemon) => {    
    let defense = {};

    const pokemonType = pokemon.types.map(type => type.type.name.toLowerCase());

    for await (const type of store.typeList) defense[type.title.toLowerCase()] = 1;

    for await (const type of pokemonType) {
      let damageRelations = store.typeDefenseList[type];
      let noDamage = damageRelations.defense.zero;
      let halfDamage = damageRelations.defense.half;
      let doubleDamage = damageRelations.defense.double;

      noDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.0 });
      halfDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 0.5 });
      doubleDamage.forEach(item => { if (defense.hasOwnProperty(item)) defense[item] = defense[item] * 2.0 });
    }

    return defense;
  };

  onMounted(() => {
    onSearch({ filterName: '', types: ['All'], gen: 'All', order: '1' });
  });
</script>
