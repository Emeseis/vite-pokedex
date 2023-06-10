<template>
  <VirtualCollection
    :cellSizeAndPositionGetter="cellSizeAndPositionGetter"
    :collection="pokemonList"
    :height="scrollerHeight"
    :width="1286"
    class="virtual-scroll mt-4 pl-1 ml-n1"
    v-show="!isLoading"
  >
    <template v-slot:cell="{ data: pokemon }">
      <v-col class="pa-0 text-center">
        <img
          width="96"
          height="96"
          class="sprite mb-n13"
          :src="pokemon.sprite"
          @click="$emit('onPokemonClicked', pokemon)"
        >
        <v-card
          color="surface"
          class="rounded-xl elevation-2 pokemon-card pb-3 pt-13"
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
    </template>
  </VirtualCollection>
  <div class="loader-grid mt-8">
    <v-col
      v-for="item in 30"
      :key="item"
      class="pa-0"
      style="margin-top: 35px;"
      v-show="isLoading"
    >
      <v-card class="rounded-xl" @click.stop height="150">
        <v-skeleton-loader color="background"></v-skeleton-loader>
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
  import VirtualCollection from "vue-virtual-collection/src/VirtualCollection.vue";
  import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
  import TypeChip from '@/components/TypeChip.vue';
  import { ref, onMounted, onUnmounted } from "vue";  

  const props = defineProps({ pokemonList: Array, isLoading: Boolean });

  const emit = defineEmits(['onPokemonClicked','onTypeClicked']);

  const cellSizeAndPositionGetter = (item, index) => {
    const width = 187.333;
    const height = 201;
    const columns = 6;
    return {
      width: width,
      height: height,
      x: (index % columns) * (width + 24),
      y: parseInt(index / columns) * (height + 8)
    }
  };
  
  const scrollerHeight = ref(window.innerHeight - 256);
  
  const onResize = () => scrollerHeight.value = window.innerHeight - 256;

  onMounted(() => window.addEventListener('resize', onResize));

  onUnmounted(() => window.removeEventListener('resize', onResize));
</script>

<style scoped>
  .virtual-scroll {
    overflow-x: hidden;
    border-radius: 24px;
  }
  .loader-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
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