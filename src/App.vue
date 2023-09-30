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
            class="d-flex align-center mr-n16 switch"
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
  const tab = ref(1);
  const toggleTheme = ref(true);
</script>

<style scoped>
  .v-application {
    max-width: 1244px;
    width: calc(100% - 36px);
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
    font-weight: 1000 !important;
  }
  :deep(.v-switch) .v-switch__thumb {
    background-color: rgb(var(--v-theme-switch)) !important;
    transform: scale(0.9) !important;
  }
  :deep(.v-switch) .v-switch__track {
    background-color: rgb(var(--v-theme-bg_switch)) !important;
  }
</style>

<style>
  html {
    overflow: hidden !important;
  }
  .v-tab__slider {
    height: 3px !important;
  }
  ::-webkit-scrollbar {
    width: 15px;
    border-radius: 7px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(var(--v-theme-bg_scroll));
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-scroll));
    border: solid 3px rgb(var(--v-theme-bg_scroll));
    border-radius: 7px;
  }
</style>
