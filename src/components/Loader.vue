<template>
  <v-overlay v-model="props.loading" persistent class="align-center justify-center">    
    <v-card height="72" width="720" class="px-8 rounded-xl" style="margin: 0 auto;">
      <v-progress-linear
        rounded
        indeterminate
        class="my-8"
        color="red"
        height="8"
      ></v-progress-linear>
    </v-card>
  </v-overlay>
</template>

<script setup>
  const props = defineProps({ loading: Boolean });
</script>