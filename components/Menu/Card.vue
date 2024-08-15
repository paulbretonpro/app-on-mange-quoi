<script setup lang="ts">
import type { IMenu } from "~/types";

withDefaults(
  defineProps<{
    isLoading?: boolean;
    menu: IMenu;
  }>(),
  {
    isLoading: false,
  }
);
</script>

<template>
  <NuxtLink
    v-if="!isLoading"
    :to="`/menus/${menu.id}`"
    class="border dark:border-gray-800 rounded-md flex justify-between w-full p-4 items-center"
  >
    <div>Semaine {{ menu.weekNumber }}</div>
    <UIcon name="fa6-solid:angle-right"></UIcon>
  </NuxtLink>

  <SkeletonButton v-else v-for="index in 3" :key="index" class="w-full h-12" />
</template>
