<template>
  <v-row class="filter-bar justify-center">
    <v-col cols="3" class="pb-0">
      <v-card class="rounded-xl elevation-2">
        <v-text-field
          hideDetails
          clearable
          label="Name"
          v-model="store.searchParams.filterName"
          @update:modelValue="emit('onFilterName', store.searchParams.filterName)"
        >
          <template #clear>
            <v-icon @click="onClear">mdi-close-circle</v-icon>
          </template>
          <template #prepend-inner>
            <v-icon class="mx-2">mdi-text-search</v-icon>
          </template>
        </v-text-field>
      </v-card>
    </v-col>
    <v-col cols="3" class="pb-0">
      <v-card class="rounded-xl elevation-2">
        <v-select
          chips
          multiple
          hideDetails
          label="Type"
          :menuProps="{ contentClass: 'v-select-custom-menu' }" 
          :items="store.typeList"
          v-model="types"
        >
          <template #prepend-inner>
            <v-icon v-if="types.length == 1" :color="store.typeList.find(i => i.title === types[0]).color" class="mx-2">
              {{ store.typeList.find(i => i.title === types[0]).icon }}
            </v-icon>
            <div v-else style="display: contents;">
              <v-icon :color="store.typeList.find(i => i.title === types[0]).color" size="small" class="pb-3">
                {{ store.typeList.find(i => i.title === types[0]).icon }}
              </v-icon>
              <v-icon :color="store.typeList.find(i => i.title === types[1]).color" size="small" class="pt-3 ml-n1 mr-1">
                {{ store.typeList.find(i => i.title === types[1]).icon }}
              </v-icon>
            </div>
          </template>
          <template #append-inner>
            <v-counter active :value="types.length" :max="2" style="width: 28px; margin-right: -4px;"></v-counter>
          </template>
          <template #chip="{ item, props }">
            <span v-if="item.raw.title === 'All'">{{ item.raw.title }}</span>
            <v-chip v-else v-bind="props" :color="store.typeList.find(i => i.title === item.raw.title).color" closable variant="elevated">
              <span class="text-black font-weight-bold">{{ item.raw.title }}</span>
            </v-chip>
          </template>
          <template #item="{ item, props }">
            <v-list-item 
              v-bind="props" 
              :title="item.raw.title" 
              :disabled="(types.length == 2 && !types.includes(item.raw.title) && item.raw.title !== 'All')
            ">
              <template #prepend>
                <v-icon :color="store.typeList.find(i => i.title === item.raw.title).color">
                  {{ item.raw.icon }}
                </v-icon>
              </template>
              <template #append>
                <v-checkbox 
                  hideDetails 
                  density="compact" 
                  :modelValue="types.includes(item.raw.title)" 
                  disabled>
                </v-checkbox>
              </template>
            </v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="3" class="pb-0">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Generation"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="store.genList"
          item-disabled="disabled"
          v-model="store.searchParams.gen"
          @update:modelValue="emit('onSearch', store.searchParams)"
        >
          <template #prepend-inner>
            <v-icon class="mx-2">{{ store.genList.find(i => i.value == store.searchParams.gen).icon }}</v-icon>
          </template>
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
              :prependIcon="item.raw.icon"
              :disabled="item.raw.disabled"
              :subtitle="item.raw.subtitle"
            ></v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="3" class="pb-0">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Order"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="store.orderList"
          v-model="store.searchParams.order"
          @update:modelValue="emit('onSearch', store.searchParams)"
        >
          <template #prepend-inner>
            <v-icon class="mx-2">{{ store.orderList.find(i => i.value == store.searchParams.order).icon }}</v-icon>
          </template>
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
              :prependIcon="item.raw.icon"
            ></v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  const store = useStore();

  let types = ref(['All']);

  const onClear = () => {
    store.searchParams.filterName = '';
    emit('onFilterName');
  }

  const typeChange = (typesChange) => {
    if (typesChange.length === 0) types.value = ['All'];
    if (typesChange.length === 2 && typesChange[0] === 'All') types.value = [typesChange[1]];
    if (typesChange.length >= 2 && typesChange[typesChange.length-1] === 'All') types.value = ['All'];
    if (typesChange.length === 3) types.value = types.value.slice(0, 2);
    if (toRaw(types.value) !== toRaw(store.searchParams.types)) {
      store.searchParams.types = toRaw(types.value);
      emit('onSearch');
    }
  };

  watch(types, newV => typeChange(newV));

  const emit = defineEmits(['onSearch','onFilterName']);
  
  onMounted(() => types.value = store.searchParams.types);
</script>

<style>
  .v-select-custom-menu {
    border-radius: 24px !important;
  }
</style>

<style scoped>
  .filter-bar {
    background-color: rgb(var(--v-theme-background));
    position: sticky;
    z-index: 3;
    top: 148px;
  }
  :deep(.v-field__prepend-inner > .v-icon) {
    opacity: 1;
  }
  :deep(.v-list-item__prepend > .v-icon) {
    opacity: 1;
  }
  :deep(.v-selection-control--disabled) {
    opacity: 1;
  }
  :deep(.v-chip__close) {
    margin-inline-start: 3.5px !important;
  }
  :deep(.v-chip__close .mdi-close-circle) {
    color: black !important;
  }
  :deep(.v-select .v-select__selection:first-child) {
    margin-inline-end: 4px !important;
  }
</style>