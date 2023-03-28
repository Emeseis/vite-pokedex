<template>
  <v-dialog v-model="props.loading">    
    <v-card height="72" width="720" class="card-center px-8 rounded-xl">
      <v-progress-linear
        rounded
        indeterminate
        class="my-8"
        color="red"
        height="8"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const props = defineProps({ loading: Boolean })
</script>

<style>
  .card-center {
    margin: 0 auto;
  }
</style>