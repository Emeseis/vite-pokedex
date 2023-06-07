<template>
  <v-row class="justify-center">
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-text-field
          hideDetails
          clearable
          label="Name"
          prependInnerIcon="mdi-text-search"
          v-model="params.name"
          @update:modelValue="onSearch"
        ></v-text-field>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Type"
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
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Generation"
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
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Order"
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
  </v-row>
  <PokemonGrid
    :pokemonList="pokemonList"
    @onPokemonClicked="onPokemonClicked"
    @onTypeClicked="onTypeClicked"
  />
  <PokemonInfoModal
    :showDialog="isPokemonInfoModal"
    :pokemon="pokemonClicked"
    @toggleDialog="isPokemonInfoModal = false"
    @onPokemonClicked="onPokemonClicked"
    @onTypeClicked="onTypeClicked"
  />
  <TypeInfoModal
    :showDialog="isTypeInfoModal"
    :type="typeClicked" 
    @toggleDialog="isTypeInfoModal = false"
  />
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { typeList, genList, orderList } from '@/composables/lists'
  import { getColor } from '@/composables/functions'
  import PokemonInfoModal from '@/components/PokemonInfoModal.vue';
  import TypeInfoModal from '@/components/TypeInfoModal.vue'
  import PokemonGrid from '@/components/PokemonGrid.vue';
  import axios from 'axios';

  let pokemonList = ref([]);
  let params = reactive({
    name: '',
    order: '1',
    gen: '1',
    type: 'All'
  });

  const onSearch = async () => {
    pokemonList.value = [];     
    try {
      const pokemons = await axios.post(`${import.meta.env.VITE_API_URL}/pokemons`, params); 
      if (pokemons.data.pokemons.length) pokemonList.value = pokemons.data.pokemons;
      else pokemonList.value = null;
    } catch (err) {
      console.error(err);
    }
  };

  let pokemonClicked = ref(null);
  let isPokemonInfoModal = ref(false);

  const onPokemonClicked = async (pokemon) => {    
    pokemonClicked.value = await fetchPokemon(pokemon);
    isPokemonInfoModal.value = true;
  };

  let typeClicked = ref(null);
  let isTypeInfoModal = ref(false);

  const onTypeClicked = (type) => {
    typeClicked.value = type;
    isTypeInfoModal.value = true;
  };

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

  onMounted(() => { onSearch(); });
</script>

<style>
  .v-select-custom-menu {
    border-radius: 24px !important;
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
