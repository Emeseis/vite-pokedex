<template>
  <div class="loader-grid rounded-xl mt-6 ml-n1 pl-1 pb-1" style="
    max-height: calc(100vh - 248px);
    width: 1287px;
    overflow: auto;
  ">
    <div 
      v-if="!isLoading"
      v-for="pokemon in pokemonList" 
      :key="pokemon"
      class="pa-0 text-center" 
      style="z-index: 1;"
    >
      <img
        width="96"
        height="96"
        class="sprite mb-n14"
        :src="pokemon.sprite"
        @click="$emit('onPokemonClicked', pokemon)"
      >
      <div
        class="pokemon-card rounded-xl elevation-2 pb-3 pt-13"
        @click="$emit('onPokemonClicked', pokemon)"
        v-ripple
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
            style="margin-left: 6px;"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isLoading"
      v-for="item in 36"
      :key="item"
      class="pa-0"
      style="margin-top: 47px;"
    >
      <v-card class="rounded-xl" @click.stop height="150">
        <v-skeleton-loader color="background"></v-skeleton-loader>
      </v-card>
    </div>
  </div>
</template>

<script setup>
  import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
  import TypeChip from '@/components/TypeChipLighter.vue';

  const props = defineProps({ pokemonList: Array, isLoading: Boolean });
  const emit = defineEmits(['onPokemonClicked','onTypeClicked']);
</script>

<style scoped>
  .virtual-scroll {
    overflow-x: hidden;
    border-radius: 24px;
  }
  .loader-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 8px 24px;
  }
  .sprite {
    position: relative;
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
    background-color: rgba(var(--v-theme-surface));
    z-index: 1;
  }
  .pokemon-card:hover {
    cursor: pointer;
    outline: 3px solid #F44336;
  }
  .entry-text {
    font-size: 12px !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>