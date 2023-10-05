<template>
  <div 
    class="mx-n1 px-1"
    :style="{
      top: props.top + 'px',
      zIndex: '3',
      height: '32px',
      position: 'sticky', 
      background: 'linear-gradient(rgb(var(--v-theme-background)), transparent 100%)'
    }"
  ></div>  
</template>

<script setup>
  const props = defineProps({ top: String });
</script>