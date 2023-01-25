<script setup lang="ts">
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
  name: string;
  target?: string;
  url: string;
}>();
</script>

<template>
  <q-card-actions>
    <q-btn
      :href="url"
      :unelevated="true"
      :target="target ?? '_blank'"
      :label="name"
      align="center"
      color="text-grey"
      icon="open_in_new"
      outline
      rounded
      no-caps
    >
    </q-btn>
  </q-card-actions>
</template>
