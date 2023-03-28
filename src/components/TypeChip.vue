<template>  	
  <v-chip
    elevation="1"
    variant="elevated"
    :class="'font-weight-bold text-black'"
    :color="getColor(props.type) + 'B3'"
    :text="props.type"
    @click.stop
  ></v-chip>
</template>

<script setup>
  import { getColor } from '@/composables/functions';
  
  const props = defineProps({ type: String });
</script>
