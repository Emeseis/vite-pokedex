<template>
  <v-app>
    <v-toolbar class="mt-8" rounded="xl" elevation="2" height="84" floating>
      <v-tabs v-model="state.tab" grow bg-color="white" color="red">
        <v-tab class="font-weight-bold" value="1" :ripple="false" to="/">
          <v-icon start size="36px">mdi-home</v-icon>
          Home
        </v-tab>
        <v-tab class="font-weight-bold" value="2" :ripple="false" to="/pokedex">
          <v-icon start size="36px">mdi-pokeball</v-icon>
          Pokédex
        </v-tab>
        <v-tab class="font-weight-bold" value="3" :ripple="false" disabled>
          <v-icon start size="36px">mdi-nintendo-game-boy</v-icon>
          Videogames
        </v-tab>
        <v-tab class="font-weight-bold" value="4" :ripple="false" disabled>
          <v-icon start size="36px">mdi-pokemon-go</v-icon>
          GCC Pokemon
        </v-tab>
        <v-tab class="font-weight-bold" value="5" :ripple="false" disabled>
          <v-icon start size="36px">mdi-television</v-icon>
          TV Pokemon
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-main>       
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import { reactive } from 'vue';

  const state = reactive({ tab: '1' });
</script>

<style scoped>
  .v-application {
    max-width: 1244px;
    margin: 0 auto;
  }
</style>

<style>
  #app {
    background: url('./assets/background2.png') no-repeat, #f6f8fc;
  }
  ::-webkit-scrollbar {
    width: 15px;
    box-shadow: 
      0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 
      0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 
      0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
  }
  ::-webkit-scrollbar-track {
    background: #f6f8fc;
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #f6f8fc;
    border-radius: 7px;
  }
  .img {
    opacity: 0.9;
    height: 200px;
    width: 200px;
    z-index: 999 !important;
  }
</style>
