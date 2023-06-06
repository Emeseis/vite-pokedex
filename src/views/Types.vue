<template>  
  <div class="type-grid my-6">
    <v-col
      v-for="(type, index) in types" :key="index"
      @click="$emit('onPokemonClicked', type)"
      class="pa-0 text-center"
      cols="auto"
    >
      <v-avatar
        size="64"
        v-ripple
        color="surface"
        class="icon mb-n8 elevation-2 mt-1">
        <v-icon :color="getColor(type.title)" :icon="type.icon"/>
      </v-avatar>
      <v-card 
        v-ripple
        :color="getColor(type.title)" 
        style="z-index: 1 !important"
        class="text-center rounded-xl type-card pt-12 pb-4">
        <div>
          <v-chip 
            size="x-large" 
            class="font-weight-bold text-black elevation-2"
            @click.stop
          >
            {{ type.title }}
          </v-chip>
        </div>
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { typeList } from '@/composables/lists';
  import { getColor } from '@/composables/functions';
  
  const types = computed(() => typeList.slice(1));
</script>

<style scoped> 
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .type-card {
    z-index: 1 !important;
    background-color: rgb(var(--v-theme-surface))
  }
  .type-card:hover {
    cursor: pointer;
  }
  .icon {
    z-index: 2;
  }
  .icon:hover {
    cursor: pointer;
  }
</style>