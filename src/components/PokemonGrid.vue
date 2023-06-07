<template>  
  <div class="pokemon-grid my-6" v-if="pokemonList">
    <v-col
      v-if="pokemonList.length"
      v-for="(pokemon, index) in pokemonList" :key="index"
      @click="$emit('onPokemonClicked', pokemon)"
      class="pa-0 mt-n4"
    >
      <v-img 
        width="96" 
        height="96" 
        class="sprite mb-n11"
        :src="pokemon.sprite"
      ></v-img>
      <v-card
        color="surface"
        class="text-center rounded-xl elevation-2 pokemon-card pb-3 pt-11"
        @click="$emit('onPokemonClicked', pokemon)"
      >
        <div class="font-weight-bold entry-text">
          #{{ pokemon.entry }}
        </div>
        <div class="font-weight-bold mt-1">
          {{ pokemon.name }}
        </div>
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
      </v-card>
    </v-col>
    <v-col v-else v-for="item in 30" :key="item" class="pa-0 mt-9">        
      <v-card class="skeleton-card rounded-xl" @click.stop height="143.19">
        <v-skeleton-loader
          class="skeleton"
          color="background"
        ></v-skeleton-loader>
      </v-card>    
    </v-col>
  </div>
</template>

<script setup>
  import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
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
  .sprite {
    margin: 0 auto;
    z-index: 2;
  }
  .sprite:hover {
    cursor: pointer;
  }
  .sprite:hover + .pokemon-card {
    outline: 3px solid #F44336;
  }
  .sprite:hover + .pokemon-card :deep(.v-card__overlay) {
    opacity: calc(var(--v-hover-opacity)*var(--v-theme-overlay-multiplier));
  }
  .pokemon-card {
    z-index: 1;
  }
  .pokemon-card:hover {
    cursor: pointer;
    outline: 3px solid #F44336;
  }
  .skeleton:hover {
    cursor: pointer;
  }
  .skeleton-card:hover {
    outline: 3px solid #F44336;
  }
  .entry-text {
    font-size: 0.8rem !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>