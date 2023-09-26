<template>
  <v-row class="justify-center">
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-text-field
          hideDetails
          clearable
          label="Name"
          prependInnerIcon="mdi-text-search"
          v-model="params.filterName"
          @update:modelValue="emit('onFilterName', params.filterName || '')"
        ></v-text-field>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Type"
          :menuProps="{ contentClass: 'v-select-custom-menu' }" 
          :items="store.typeList"
          v-model="params.type"
          @update:modelValue="emit('onSearch', params)"
        >
          <template #prepend-inner>
            <v-icon :color="getColor(params.type)">
              {{ store.typeList[store.typeList.findIndex(item => item.title == params.type)].icon }}
            </v-icon>
          </template>
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              :title="item.raw.title"
            >
              <template #prepend>
                <v-icon :color="getColor(item.raw.title)">
                  {{ item.raw.icon }}
                </v-icon>
              </template>
            </v-list-item>
          </template>
        </v-select>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Generation"
          :prependInnerIcon="store.genList[store.genList.findIndex(item => item.value == params.gen)].icon"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="store.genList"
          item-disabled="disabled"
          v-model="params.gen"
          @update:modelValue="emit('onSearch', params)"
        >
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
    <v-col cols="3">
      <v-card class="rounded-xl elevation-2">
        <v-select
          hideDetails
          label="Order"
          :prependInnerIcon="store.orderList[store.orderList.findIndex(item => item.value == params.order)].icon"
          :menuProps="{ contentClass: 'v-select-custom-menu' }"
          :items="store.orderList"
          v-model="params.order"
          @update:modelValue="emit('onSearch', params)"
        >
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
  import { getColor } from '@/composables/functions';

  const store = useStore();

  let params = reactive({
    filterName: '',
    type: 'All',
    gen: 'All',
    order: '1'
  });

  const emit = defineEmits(['onSearch','onFilterName']);
</script>

<style>
  .v-select-custom-menu {
    border-radius: 24px !important;
  }
</style>

<style scoped>
  :deep(.v-field__prepend-inner > .v-icon) {
    opacity: 1;
  }
  :deep(.v-list-item__prepend > .v-icon) {
    opacity: 1;
  }
</style>