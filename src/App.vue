<template>
  <v-theme-provider :theme="toggleTheme ? 'dark': 'light'" with-background>
    <v-app>
      <img id="pokeball-watermark" src="@/assets/pokeball.svg">
      <v-toolbar class="my-8" rounded="xl" elevation="2" height="84" style="z-index: 1;" floating>
        <v-tabs v-model="tab" grow color="red">
          <v-tab class="font-weight-bold" :value="1" :ripple="false" to="/">
            <v-icon start size="36px">mdi-home</v-icon>
            Home
          </v-tab>
          <v-tab class="font-weight-bold" :value="2" :ripple="false" to="/pokedex">
            <v-icon start size="36px">mdi-pokeball</v-icon>
            Pokédex
          </v-tab>
          <v-tab class="font-weight-bold" :value="3" :ripple="false" to="/types">
            <v-icon start size="36px">mdi-atom</v-icon>
            Types
          </v-tab>
          <v-tab class="font-weight-bold" :value="4" :ripple="false" to="/moves">
            <v-icon start size="36px">mdi-arrow-all</v-icon>
            Moves
          </v-tab>
          <v-tab class="font-weight-bold" :value="5" :ripple="false" disabled>
          </v-tab>
          <v-switch
            inset
            hide-details
            v-model="toggleTheme"
            class="d-flex align-center mr-n16"
          ></v-switch>
        </v-tabs>
      </v-toolbar>
      <v-main>       
        <router-view/>
      </v-main>
    </v-app>    
  </v-theme-provider>
</template>

<script setup>
  import { ref } from 'vue';

  const tab = ref(1);
  const toggleTheme = ref(true);
</script>

<style scoped>
  .v-application {
    max-width: 1244px;
    margin: 0 auto;
  }
  #pokeball-watermark {
    position: fixed;
    top: -10vw; 
    left: -10vw;
    width: 50vw;
    height: 50vw;
    opacity: 0.1;
    z-index: 0;
  }
  .v-tab--selected {
    font-weight: 900 !important;
  }
</style>

<style>
  .v-tab__slider {
    height: 3px !important;
  }
  ::-webkit-scrollbar {
    width: 15px;
    box-shadow: 
      0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 
      0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 
      0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
  }
  ::-webkit-scrollbar-track {
    background: rgba(222,222,222);
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #444;
    border: solid 3px rgba(222,222,222);
    border-radius: 7px;
  }
</style>
