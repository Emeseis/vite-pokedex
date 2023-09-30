<template>  	
  <div 
    class="type-chip text-center font-weight-bold text-black elevation-1"
    @click="emit('onTypeClicked', type)"
    v-ripple
    :style="{
      height: '62px',
      width: '88px',
      borderRadius: '20px',
      backgroundColor: store.typeList.find(i => i.title === type).color + 'B3',
      margin: '0 auto',
      zIndex: '1'
    }"
  > 
    <div class="mb-n1">{{ type }}</div>
    <div
      class="font-weight-regular text-white effectiveness-chip"
      :class="effectiveness != 1 ? 'elevation-2' : 'elevation-n1'"
      @click.stop="effectiveness != 1 ? emit('onTypeClicked', type) : ''"
      v-ripple.stop="effectiveness != 1 ? false : true"
      :style="{
        width: '76px',
        height: '28px',
        fontSize: getEffectivenessFont(effectiveness),
        backgroundColor: getEffectivenessColor(effectiveness),
        borderRadius: '24px',
        justifyContent: 'center',
        display: 'inline-flex',
        zIndex: '0'
      }"
    >
      <span :style="{ marginTop: effectiveness < 1 && effectiveness > 0 ? '-2px' : '' }">
        {{ getEffectivenessText(effectiveness) }}
      </span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({ type: String, effectiveness: Number });

  const emit = defineEmits(['onTypeClicked']);

  const store = useStore();

  const getEffectivenessFont = (effectiveness) => {
    if (effectiveness == 0) return '0.875rem';
    else if (effectiveness > 1) return '0.875rem';
    else if (effectiveness < 1) return '1.075rem';
    else return '0.875rem';
  };

  const getEffectivenessText = (effectiveness) => {
    if (effectiveness == 1) return '';
    else if (effectiveness == 0.50) return '½';
    else if (effectiveness == 0.25) return '¼';
    else return effectiveness;
  };
  
  const theme = document.getElementsByClassName('v-theme-provider')[0];
  const color = getComputedStyle(theme).getPropertyValue('--v-theme-on-surface-variant');

  const getEffectivenessColor = (effectiveness) => {
    if (effectiveness == 4.00) return '#73D216';
    if (effectiveness == 2.00) return '#4E9A06';
    if (effectiveness == 1.25) return '#4E9A06';
    if (effectiveness == 1.00) return `rgb(${color})`;
    if (effectiveness == 0.50) return '#A40000';
    if (effectiveness == 0.25) return '#7C0000';
    if (effectiveness == 0.00) return '#2E3436';
  };
</script>

<style scoped>
  .type-chip:hover {
    cursor: pointer;
  }
  .elevation-n1 {
    box-shadow:
      inset 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      inset 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
  }
  .effectiveness-chip:not(.elevation-2):hover {
    cursor: default;
  }
</style>