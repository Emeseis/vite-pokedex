<template>  
  <div class="type-grid my-6">
    <v-col
      v-for="(type, index) in typeList" :key="index"
      @click="$emit('onTypeClicked', type)"
      class="text-center rounded-xl elevation-2 type-card mt-10"
      cols="auto"
      v-ripple
    >
      <div class="font-weight-bold entry-text">#{{ type.entry }}</div>
      <div class="font-weight-bold mt-1">{{ type.name }}</div>
    </v-col>
  </div>
</template>

<script setup>
  const props = defineProps({ typeList: Array });
</script>

<style scoped> 
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .type-card {
    z-index: 1;
    background-color: rgb(var(--v-theme-surface))
  }
  .type-card:hover {
    cursor: pointer;
  }
  .entry-text {
    font-size: 0.8rem !important;
    font-family: "Roboto", sans-serif !important;
    text-transform: uppercase !important;
  }
</style>