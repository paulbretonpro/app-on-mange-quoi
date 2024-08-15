<script setup lang="ts">
import type { IRecipe } from "~/types";

withDefaults(
  defineProps<{
    isLoading?: boolean;
    recipe: IRecipe;
  }>(),
  {
    isLoading: false,
  }
);

const modalIsOpen = ref(false);

const handlePostNewMenu = () => {
  modalIsOpen.value = true;
};
</script>
<template>
  <UCard class="min-w-56" v-if="!isLoading">
    <NuxtLink :to="`/recipes/${recipe.id}`">
      <div class="flex items-center justify-center">
        <UIcon name="fa6-solid:bowl-food" class="w-12 h-12 text-primary" />
      </div>
    </NuxtLink>

    <template #footer>
      <div class="flex gap-4 justify-between">
        <NuxtLink
          :to="`/recipes/${recipe.id}`"
          class="whitespace-nowrap text-ellipsis overflow-hidden grow"
        >
          {{ recipe.name }}
        </NuxtLink>

        <div class="flex gap-1 items-center">
          <div>{{ recipe.nbPersons }}</div>
          <UIcon name="fa6-solid:utensils"></UIcon>
        </div>
        <UButton
          variant="outline"
          icon="i-heroicons-plus"
          @click="handlePostNewMenu"
          >Ajouter</UButton
        >
      </div>
    </template>
  </UCard>

  <div
    v-else
    v-for="index in 5"
    :key="index"
    class="animate-pulse border border-gray-200 dark:border-gray-600 rounded-md px-4 py-3 h-40 min-w-56 flex flex-col"
  >
    <div class="grow flex items-center justify-center">
      <USkeleton class="w-16 h-8" :ui="{ rounded: 'rounded-full' }" />
    </div>
    <div class="flex gap-4">
      <USkeleton class="w-full h-3" />
      <USkeleton class="w-8 h-3" />
      <USkeleton class="w-20 h-3" />
    </div>
  </div>

  <LazyRecipeModalChooseWeekAndDay
    v-model="modalIsOpen"
    v-if="modalIsOpen"
    :recipe-id="recipe.id"
  />
</template>
