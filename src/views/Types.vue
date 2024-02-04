<template>
  <div class="type-grid">
    <v-col
      v-for="(type, index) in store.typeList.slice(1)" :key="index"
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
        <v-icon size="x-large" :color="store.typeList.find(i => i.title === type.title).color" :icon="type.icon"/>
      </v-avatar>
      <v-card 
        v-ripple
        :color="store.typeList.find(i => i.title === type.title).color" 
        style="z-index: 1 !important"
        class="type-card text-center rounded-xl pt-12 pb-4"
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
</template>

<script setup>
  import TypeChip from '@/components/TypeChip.vue';
  
  const store = useStore();

  const onTypeClicked = (type) => {
    console.log(type);
  };
</script>

<style scoped> 
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 187.333px));
    grid-gap: 24px;
  }
  .icon {
    z-index: 2;
  }
  .icon:hover {
    cursor: pointer;
  }
  .icon:hover + .type-card {
    outline: 3px solid rgb(var(--v-theme-tertiary));
  }
  .type-card {
    z-index: 1 !important;
  }
  .type-card:hover {
    cursor: pointer;
    outline: 3px solid rgb(var(--v-theme-tertiary));
  }
</style>