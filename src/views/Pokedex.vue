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
  const router = useRouter();

  let searchLoading = ref(false);
  let pokemonListFiltered = ref([]);

  const onSearch = async (params) => {
    searchLoading.value = true;

    if (!store.pokemonList.length) 
      store.pokemonList = (await axios.post(`${store.API_URL}/pokemons`, params)).data.pokemons;

    if (params.filterName) onFilterName(params.filterName);
    else pokemonListFiltered.value = store.pokemonList;

    searchLoading.value = false;
  };

  const onFilterName = (name) => {
    if (name) pokemonListFiltered.value = store.pokemonList.filter(poke => {
      return poke.name.toLowerCase().includes(name.toLowerCase());
    });
    else pokemonListFiltered.value = store.pokemonList;
  };

  let isLoading = ref(false);
  let pokemonClicked = ref(null);
  let isPokemonInfoModal = ref(false);

  const onPokemonClicked = async (pokemon) => {
    router.push(`/pokedex/${pokemon.name.toLowerCase()}`);
  };

  let typeClicked = ref(null);
  let isTypeInfoModal = ref(false);

  const onTypeClicked = (type, place) => {
    if (place !== 'modal') isLoading.value = true;
    typeClicked.value = type;
    isLoading.value = false;
    isTypeInfoModal.value = true;
  };

  onMounted(() => {
    onSearch(store.searchParams);
  });
</script>
