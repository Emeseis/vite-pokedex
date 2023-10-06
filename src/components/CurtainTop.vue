<template>
  <div 
    class="mx-n1 px-1"
    :style="{
      zIndex: '3',
      position: 'sticky', 
      top: props.top + 'px',
      height: props.height + 'px',
      background: 'linear-gradient(rgb(var(--v-theme-background)), transparent 100%)'
    }"
  ></div>  
</template>

<script setup>
  const props = defineProps({ top: String, height: String });
</script>