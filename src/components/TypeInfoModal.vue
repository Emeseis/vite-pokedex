<template>
  <v-dialog v-model="visible" width="1244" class="v-overlay--scroll-blocked">
    <v-card class="pa-6" rounded="xl" color="background">
      <div class="text-h4 font-weight-black text-center">
        {{ type }}
        <span class="text-grey">(type)</span>
      </div>  
    </v-card>
  </v-dialog>
</template>

<script setup>
  const emit = defineEmits(['toggleDialog']);

  const props = defineProps({
    showDialog: Boolean,
    type: String
  });

  const visible = computed({
    get: () => props.showDialog,
    set: (newVal) => emit('toggleDialog', newVal)
  });
</script>

<style scoped>
</style>