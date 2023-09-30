<template>  	
  <v-chip
    elevation="1"
    variant="elevated"
    @click.stop="$emit('onTypeClicked', type)"
    :class="'font-weight-bold text-black'"
    :color="store.typeList.find(i => i.title === type).color + 'B3'"
    :text="type"
  ></v-chip>
</template>

<script setup>
  const props = defineProps({ type: String });
  const store = useStore();
  const emit = defineEmits(['onTypeClicked']);
</script>
