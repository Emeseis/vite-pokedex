<template>
  <v-theme-provider :theme="isDark ? 'dark': 'light'" with-background>
    <v-app>
      <div class="header mb-6">
        <v-toolbar elevation="2" height="84">
          <v-tabs v-model="tab" grow color="red">
            <v-tab class="font-weight-bold" :value="1" @click="tab = 2" :ripple="false" to="/">
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
              v-model="isDark"
              class="d-flex align-center mr-n16 switch"
            ></v-switch>
          </v-tabs>
        </v-toolbar>
      </div>
      <v-main>       
        <router-view/>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script setup>
  const route = useRoute();

  const tab = ref(1);
  const isDark = ref(true);

  watch(() => route.name, () => {
    if (route.name === "Pokemon") {
      tab.value = 2;
      document.querySelectorAll('a[value="2"]')[0].style.color = '#F44336';
    } else document.querySelectorAll('a[value="2"]')[0].style.color = isDark.value ? 'white' : 'black';
  });

  watch(() => isDark.value, () => {
    if (route.name === "Pokemon") document.querySelectorAll('a[value="2"]')[0].style.color = '#F44336';
    else document.querySelectorAll('a[value="2"]')[0].style.color = isDark.value ? 'white' : 'black';
    document.documentElement.style.setProperty('--v-theme-light', isDark.value ? 1.2 : 0.95);
    document.documentElement.style.setProperty('--v-theme-scroll', isDark.value ? '22,22,22' : '155,155,155');
    document.documentElement.style.setProperty('--v-theme-bg-scroll', isDark.value ? '66,66,66' : '222,222,222');
  });
</script>

<style scoped>
  .v-application main {
    max-width: 1244px;
    width: calc(100% - 36px);
    margin: 0 auto;
  }  
  .header {
    position: sticky; 
    z-index: 999; 
    top: 0;
  }
  .v-tab--selected {
    font-weight: 1000 !important;
  }
  :deep(.v-switch) .v-switch__thumb {
    background-color: rgb(var(--v-theme-switch)) !important;
    transform: scale(0.9) !important;
  }
  :deep(.v-switch) .v-switch__track {
    background-color: rgb(var(--v-theme-bg-switch)) !important;
  }
</style>

<style>
  :root {
    --v-theme-light: 1.2;
    --v-theme-scroll: 22,22,22;
    --v-theme-bg-scroll: 66,66,66;
  }
  html {
    overflow-y: scroll !important;
  }
  .v-tab__slider {
    height: 3px !important;
  }
  html > ::-webkit-scrollbar-track {
    background: rgb(var(--v-theme-bg-scroll)) !important; 
    border-radius: 0px !important;
  }
  html > ::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-scroll)) !important;
    border: solid 3px rgb(var(--v-theme-bg-scroll)) !important;
  }
  ::-webkit-scrollbar {
    width: 15px;
    border-radius: 7px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(var(--v-theme-bg-scroll));
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-scroll));
    border: solid 3px rgb(var(--v-theme-bg-scroll));
    border-radius: 7px;
  }
</style>
