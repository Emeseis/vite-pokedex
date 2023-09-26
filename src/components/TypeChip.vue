<template>  	
  <v-chip
    elevation="1"
    variant="elevated"
    @click.stop="$emit('onTypeClicked', type)"
    :class="'font-weight-bold text-black'"
    :color="getColor(type) + 'B3'"
    :text="type"
  ></v-chip>
</template>

<script setup>
  const props = defineProps({ type: String });

  const emit = defineEmits(['onTypeClicked']);
</script>
