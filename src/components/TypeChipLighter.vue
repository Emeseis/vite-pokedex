<template>  	
  <span
    v-ripple
    class="font-weight-bold text-black elevation-1"
    @click.stop="$emit('onTypeClicked', type)"
    :style="{
      height: '32px',
      fontSize: '0.875rem',
      padding: '8px 12px',
      borderRadius: '24px',
      backgroundColor: getColor(type) + 'B3',
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
    }"
  >{{ type }}</span>
</template>

<script setup>
  import { getColor } from '@/composables/functions';
  
  const props = defineProps({ type: String });

  const emit = defineEmits(['onTypeClicked']);
</script>