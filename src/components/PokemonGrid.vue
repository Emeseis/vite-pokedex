<template>
  <div class="container-grid mx-n1 px-1 my-6 justify-center">
    <div v-show="!isLoading" style="display: contents">
      <div v-for="pokemon in pokemonList" :key="pokemon" class="pa-0 text-center" style="z-index: 1;">
        <img
          width="96"
          height="96"
          class="sprite mb-n14"
          :src="`/pokemon-sprites/${pokemon.id}.png`"
          @click="$emit('onPokemonClicked', pokemon);"
          @mousedown="setRipple"
          @mouseup="removeRipple"
          @mouseout="removeRipple"
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
            {{ pokemon.label }}
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
    </div>
    <div v-show="isLoading" style="display: contents">
      <div v-for="item in 42" :key="item" class="pa-0">
        <img
          width="96"
          height="96"
          class="mb-n14"
          src="@/assets/hidden.png"
          style="visibility: hidden"
        >
        <v-card class="rounded-xl" @click.stop height="150">
          <v-skeleton-loader type="card" color="background"></v-skeleton-loader>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TypeChip from '@/components/TypeChipLighter.vue';

  const props = defineProps({ pokemonList: Array, isLoading: Boolean });
  
  const emit = defineEmits(['onPokemonClicked', 'onTypeClicked']);

  const setRipple = (event) => {
    let card = event.target.nextElementSibling;
    let offset = card.getBoundingClientRect();
    let newEvent = new Event("mousedown");
    newEvent.clientX = offset.left + offset.width/2;
    newEvent.clientY = offset.top + 10;
    card.dispatchEvent(newEvent);
  };
  
  const removeRipple = (event) => {
    event.target.nextElementSibling.dispatchEvent(new Event("mouseup"));
  };
</script>

<style scoped>
  .container-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 8px 24px;
  }
  .sprite {
    position: relative;
    z-index: 3;
    transition: filter 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .sprite:hover {
    cursor: pointer;
  }
  .sprite:hover + .pokemon-card {
    outline: 3px solid #F44336;
    filter: brightness(var(--v-theme-light));
  }
  .pokemon-card {
    height: 150px;
    background-color: rgba(var(--v-theme-surface));
    transition: filter 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .pokemon-card:hover {
    cursor: pointer;
    outline: 3px solid #F44336;
    filter: brightness(var(--v-theme-light));
  }
  .entry-text {
    font-size: 12px !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>