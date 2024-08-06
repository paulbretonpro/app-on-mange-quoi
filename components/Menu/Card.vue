<script setup lang="ts">
import type { IMenu } from "~/types";

defineProps<{
  menu: IMenu;
}>();
</script>

<template>
  <NuxtLink
    :to="`/menus/${menu.id}`"
    class="border dark:border-gray-800 rounded-md flex justify-between w-full p-4 items-center"
  >
    <div>Semaine {{ menu.weekNumber }}</div>
    <UIcon name="fa6-solid:angle-right"></UIcon>
  </NuxtLink>
</template>
