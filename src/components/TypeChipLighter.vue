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
      backgroundColor: store.typeList.find(i => i.title === type).color + 'B3',
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
    }"
  >{{ type }}</span>
</template>

<script setup>
  const props = defineProps({ type: String });
  const store = useStore();
  const emit = defineEmits(['onTypeClicked']);
</script>