<template>  
  <div class="type-grid my-6">
    <v-col
      v-for="(type, index) in types" :key="index"
      @click="onTypeClicked(type.title)"
      class="pa-0 text-center"
      cols="auto"
    >
      <v-avatar
        size="64"
        v-ripple
        color="surface"
        class="icon mb-n8 elevation-1 mt-1"
      >
        <v-icon size="x-large" :color="getColor(type.title)" :icon="type.icon"/>
      </v-avatar>
      <v-card 
        v-ripple
        :color="getColor(type.title)" 
        style="z-index: 1 !important"
        class="text-center rounded-xl type-card pt-12 pb-4"
      >
        <TypeChip 
          size="x-large"
          variant="tonal" 
          :type="type.title"
          @onTypeClicked="onTypeClicked"
        />
      </v-card>
    </v-col>
  </div>
  <TypeInfoModal
    :showDialog="isTypeInfoModal"
    :type="typeClicked" 
    @toggleDialog="isTypeInfoModal = false"
  />
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { typeList } from '@/composables/lists';
  import { getColor } from '@/composables/functions';
  import TypeChip from '@/components/TypeChip.vue';
  import TypeInfoModal from '@/components/TypeInfoModal.vue';
  
  const types = computed(() => typeList.slice(1));
  const isTypeInfoModal = ref(false);
  const typeClicked = ref(null);

  const onTypeClicked = (type) => {
    typeClicked.value = type;
    isTypeInfoModal.value = true;
  };
</script>

<style scoped> 
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .type-card {
    z-index: 1 !important;
    background-color: rgb(var(--v-theme-surface))
  }
  .type-card:hover {
    cursor: pointer;
  }
  .icon {
    z-index: 2;
  }
  .icon:hover {
    cursor: pointer;
  }
</style>