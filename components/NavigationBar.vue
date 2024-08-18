<script setup lang="ts">
const links = [
  [
    {
      label: "Accueil",
      to: "/",
    },
    {
      label: "Recettes",
      to: "/recipes",
    },
    {
      label: "Menus",
      to: "/menus",
    },
    {
      label: "Profile",
      to: "/profile",
    },
  ],
];
</script>
<template>
  <UHorizontalNavigation
    :links="links"
    :ui="{ wrapper: 'relative w-full flex items-center justify-center' }"
    class="border-t !border-gray-200 bg-white dark:bg-transparent dark:backdrop-blur dark:!border-gray-800 sticky bottom-0 !z-50"
  >
    <template #default="{ link }">
      <span class="group-hover:text-primary relative">{{ link.label }}</span>
    </template>
  </UHorizontalNavigation>
</template>
