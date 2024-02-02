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
    :pokemonList="store.pokemonListFiltered"
    @onPokemonClicked="onPokemonClicked"
    @onTypeClicked="onTypeClicked"
  />
</template>

<script setup>
  import Loader from '@/components/Loader.vue';
  import FilterBar from '@/components/FilterBar.vue'
  import PokemonGrid from '@/components/PokemonGrid.vue';

  const store = useStore();
  const router = useRouter();

  let searchLoading = ref(false);

  const onSearch = async () => {
    searchLoading.value = true;

    if (!store.pokemonListAll.length) await store.getAllPokemons();
    if (!store.pokemonList.length) store.pokemonList = store.pokemonListAll;

    if (JSON.stringify(store.searchParams) === JSON.stringify(store.defaultSearchParms)) store.pokemonList = store.pokemonListAll;
    else store.pokemonList = (await axios.post(`${store.API_URL}/getPokemons`, store.searchParams)).data.pokemons;

    if (store.searchParams.filterName.length) onFilterName(store.searchParams.filterName);
    else store.pokemonListFiltered = store.pokemonList;
    
    searchLoading.value = false;
  };

  const onFilterName = (name) => {
    if (name) store.pokemonListFiltered = store.pokemonList.filter(poke => {
      return poke.name.includes(name.trim().toLowerCase());
    });
    else store.pokemonListFiltered = store.pokemonList;
  };

  let isLoading = ref(false);

  const onPokemonClicked = async (pokemon) => {
    router.push(`/pokedex/${pokemon.name}`);
  };

  const onTypeClicked = (type) => {
    console.log(type);
  };

  onSearch();
</script>
