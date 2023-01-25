<script setup lang="ts">
import { computed, defineProps } from '@vue/runtime-core';

defineProps<{
  // iconName: string;
  frameworks: {
    content: {
      frameworkName: string;
      frameworkVersion: string;
    };
  }[];
}>();
</script>

<template>
  <q-card
    class="flex items-center q-gutter-x-sm"
    flat
    v-for="framework in frameworks"
    :key="framework"
  >
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('umbraco')"
      size="sm"
      name="fa-brands fa-umbraco"
      color="umbraco"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('shopify')"
      size="sm"
      name="fa-brands fa-shopify"
      color="shopify"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('react')"
      size="sm"
      name="fa-brands fa-react"
      color="react"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('bootstrap')"
      size="sm"
      name="fa-brands fa-bootstrap"
      color="bootstrap"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('angular')"
      size="sm"
      name="fa-brands fa-angular"
      color="angular"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('node')"
      size="sm"
      name="fa-brands fa-node-js"
    ></q-icon>
    <q-icon
      v-if="framework.content.frameworkName.toLowerCase().includes('vue')"
      size="sm"
      name="fa-brands fa-vuejs"
    >
    </q-icon>
    <div class="text-subtitle2">{{ framework.content.frameworkName }}</div>
    <div class="text-subtitle2 text-text-grey">
      {{ framework.content.frameworkVersion }}
    </div>
  </q-card>
</template>

<style lang="scss">
.text-umbraco {
  color: #3844aa !important;
}

.text-shopify {
  color: #96bf48 !important;
}

.text-react {
  color: #61dbdb !important;
}

.text-bootstrap {
  color: #3844aa !important;
}

.text-angular {
  color: #b52e31 !important;
}
</style>
