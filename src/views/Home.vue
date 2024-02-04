<template>
  <v-row class="fill-height">
    <v-col class="">
      <v-card class="pa-4 fill-height color-variant" rounded="xl">
        <v-row class="fill-height" no-gutters>
          <v-col>
            <v-card 
              @click="$router.push('/pokedex')"
              class="cards pa-4 fill-height mr-3 d-flex align-center justify-center" 
              rounded="xl" 
              v-ripple
            >
              <div>
                <v-icon size="192" class="mb-8 mt-n4">mdi-pokeball</v-icon>
                <div class="title text-button text-center">Pokédex</div>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card 
              @click="$router.push('/types')"
              class="cards pa-4 fill-height mx-1_5 d-flex align-center justify-center" 
              rounded="xl" 
              v-ripple
            >
              <div>
                <v-icon size="192" class="mb-8 mt-n4">mdi-atom</v-icon>
                <div class="title text-button text-center">Types</div>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card 
              @click="$router.push('/moves')"
              class="cards pa-4 fill-height ml-3 d-flex align-center justify-center" 
              rounded="xl" 
              v-ripple
            >
              <div>
                <v-icon size="192" class="mb-8 mt-n4">mdi-arrow-all</v-icon>
                <div class="title text-button text-center">Moves</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
</script>

<style scoped>
  .color-variant {
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .cards:hover {
    outline: 3px solid rgb(var(--v-theme-tertiary));
    cursor: pointer;
  }
  .title {
    font-size: 40px !important;
    font-weight: bolder !important;
  }
  .mx-1_5 {
    margin: 0 6px !important;
  }
</style>