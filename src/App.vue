<template>
  <v-theme-provider :theme="isDark ? 'dark': 'light'" with-background>
    <v-app>
      <div class="header mb-6 elevation-2">
        <v-btn-toggle v-model="tab" mandatory style="height: 84px;" class="rounded-0">
          <v-btn size="x-large" stacked class="header-btn" @click="$router.push('/')">
            <v-icon>mdi-home</v-icon>
            <span>Home</span>
          </v-btn>
          <v-btn size="x-large" stacked class="header-btn" @click="$router.push('/pokedex')">
            <v-icon>mdi-pokeball</v-icon>
            <span>Pokedex</span>
          </v-btn>
          <v-btn size="x-large" stacked class="header-btn" @click="$router.push('/types')">
            <v-icon>mdi-atom</v-icon>
            <span>Types</span>
          </v-btn>
          <v-btn size="x-large" stacked class="header-btn" @click="$router.push('/moves')">
            <v-icon>mdi-arrow-all</v-icon>
            <span>Moves</span>
          </v-btn>
        </v-btn-toggle>
        <div class="header-btn d-flex align-center justify-center">
          <div class="text-center">
            <v-switch
              inset
              hide-details
              v-model="isDark"
            ></v-switch>
          </div>
        </div>
      </div>
      <v-main>       
        <router-view/>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script setup>
  const route = useRoute();

  const tab = ref(undefined);
  const isDark = ref(true);

  watch(() => route.name, () => {
    if (route.name == 'Home') tab.value = 0;
    if (route.name == 'Pokedex') tab.value = 1;
    if (route.name == 'Pokemon') tab.value = 1;
    if (route.name == 'Types') tab.value = 2;
    if (route.name == 'Moves') tab.value = 3;
  });

  watch(() => isDark.value, () => {
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
    background-color: rgb(var(--v-theme-surface));
    position: sticky; 
    display: flex;
    z-index: 999; 
    top: 0;
  }
  .header-btn {
    width: calc(20vw - (15px / 5));
  }
  .v-tab--selected {
    font-weight: 1000 !important;
  }
  .v-btn--stacked .v-icon {
    margin-bottom: 4px;
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
