<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <q-layout class="layout-page" view="hHh lpR fFf">
    <q-page-container style="max-width: 1400px; margin: 0 auto">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
@import 'styles/main';

.layout-page {
  background-color: $bg;
}
</style>
