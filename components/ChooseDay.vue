<script setup lang="ts">
const selectedDay = defineModel("selectedDay");

const options = [
  {
    name: "Lundi - midi",
    value: { day: 0, isLunch: true },
  },
  {
    name: "Lundi - soir",
    value: { day: 0, isLunch: false },
  },
  {
    name: "Mardi - midi",
    value: { day: 1, isLunch: true },
  },
  {
    name: "Mardi - soir",
    value: { day: 1, isLunch: false },
  },
  {
    name: "Mercredi - midi",
    value: { day: 2, isLunch: true },
  },
  {
    name: "Mercredi - soir",
    value: { day: 2, isLunch: false },
  },
  {
    name: "Jeudi - midi",
    value: { day: 3, isLunch: true },
  },
  {
    name: "Jeudi - soir",
    value: { day: 3, isLunch: false },
  },
  {
    name: "Vendredi - midi",
    value: { day: 4, isLunch: true },
  },
  {
    name: "Vendredi - soir",
    value: { day: 4, isLunch: false },
  },
  {
    name: "Samedi - midi",
    value: { day: 5, isLunch: true },
  },
  {
    name: "Samedi - soir",
    value: { day: 5, isLunch: false },
  },
  {
    name: "Dimanche - midi",
    value: { day: 6, isLunch: true },
  },
  {
    name: "Dimanche - soir",
    value: { day: 6, isLunch: false },
  },
];
</script>
<template>
  <USelectMenu
    v-model="selectedDay"
    :options="options"
    option-attribute="name"
    placeholder="Sélectionner un jour"
  ></USelectMenu>
</template>
