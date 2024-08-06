<script setup lang="ts">
import type { IMenu } from "~/types";

const menuSelected = defineModel("menuSelected");

const { data: menus } = useFetch<IMenu[]>("/api/menus");
</script>

<template>
  <USelectMenu
    v-model="menuSelected"
    :options="menus"
    value-attribute="id"
    placeholder="Choisir une semaine"
  >
    <template #label>
      <span v-if="menuSelected"
        >Semaine
        {{ menus?.find((m) => m.id === menuSelected)?.weekNumber }}</span
      >
      <span v-else>Sélectionner une semaine</span>
    </template>
    <template #option="{ option }">
      <span>Semaine {{ option.weekNumber }}</span>
    </template>
  </USelectMenu>
</template>
