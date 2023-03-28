<template>  
  <div class="pokemon-grid mt-8">
    <v-col
      v-for="(pokemon, index) in pokemonList" :key="index"
      @click="$emit('onPokemonClicked', pokemon)"
      class="text-center rounded-xl elevation-2 pokemon-card mt-6 mb-2"
      cols="auto"
      v-ripple
    >
      <v-img 
        width="96" 
        height="96" 
        class="sprite mt-n16" 
        style="z-index: 1;"
        :src="pokemon.sprite" 
      ></v-img>
      <div class="font-weight-bold" style="color: #777; font-size: 14px">#{{ pokemon.entry }}</div>
      <div class="font-weight-bold mt-1 text-black">{{ pokemon.name }}</div>
      <div class="mt-2">
        <type-chip
          :type="pokemon.types[0].type.name"
        ></type-chip>
        <type-chip
          v-if="pokemon.types.length == 2"
          :type="pokemon.types[1].type.name"
          class="ml-1"
        ></type-chip>
      </div>
    </v-col>
  </div>
</template>

<script setup>
  import TypeChip from '@/components/TypeChip.vue';

  const props = defineProps({ pokemonList: Array });
</script>

<style scoped> 
  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .pokemon-card {
    background-color: white;
  }
  .pokemon-card:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
  }
  .sprite {
    margin: 0 auto;
  }
</style>