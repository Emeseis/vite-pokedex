<template>
  <v-card height="280px">
    <v-row class="pa-4">
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable py-1">
          <tbody>
            <tr>
              <td class="text-header" width="15%">HP</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Attack</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Defense</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Sp. Atk</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Sp. Def</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Speed</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-header">Total</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="6" class="text-left">
        <table width="100%" class="customTable margin-b7">
          <tbody>
            <tr>
              <h3>Type Defenses</h3>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
</script>

<style scoped>
  .customTable {
    border-radius: 24px;
    padding: 0 16px;
    background-color: rgb(var(--v-theme-on-surface-variant));
  }
  .customTable tr {
    line-height: 32px;
    font-size: 13px;
  }
  .margin-b7 {
    margin-bottom: 7px;
  }
</style>