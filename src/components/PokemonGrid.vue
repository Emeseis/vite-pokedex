<template>  
  <div class="pokemon-grid my-6">
    <v-col
      v-for="(pokemon, index) in pokemonList" :key="index"
      @click="$emit('onPokemonClicked', pokemon)"
      class="text-center rounded-xl elevation-2 pokemon-card mt-10"
      cols="auto"
      v-ripple
    >
      <v-img 
        width="96" 
        height="96" 
        class="sprite mt-n16"
        :src="pokemon.sprite" 
      ></v-img>
      <div class="font-weight-bold entry-text">#{{ pokemon.entry }}</div>
      <div class="font-weight-bold mt-1">{{ pokemon.name }}</div>
      <div class="mt-2">
        <TypeChip 
          :type="pokemon.types[0].type.name"
          @onTypeClicked="$emit('onTypeClicked', pokemon.types[0].type.name)"
        />
        <TypeChip
          v-if="pokemon.types.length == 2"
          :type="pokemon.types[1].type.name"
          @onTypeClicked="$emit('onTypeClicked', pokemon.types[1].type.name)"
          class="ml-1"
        />
      </div>
    </v-col>
  </div>
</template>

<script setup>
  import TypeChip from '@/components/TypeChip.vue';

  const props = defineProps({ pokemonList: Array });
  const emit = defineEmits(['onPokemonClicked','onTypeClicked']);
</script>

<style scoped> 
  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .pokemon-card {
    z-index: 1;
    background-color: rgb(var(--v-theme-surface))
  }
  .pokemon-card:hover {
    cursor: pointer;
  }
  .sprite {
    margin: 0 auto;
  }
  .entry-text {
    font-size: 0.8rem !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>