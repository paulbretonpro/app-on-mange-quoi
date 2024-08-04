<script setup lang="ts">
import type { IRecipe } from "~/types";

defineProps<{
  recipe: IRecipe;
}>();
</script>
<template>
  <div
    class="flex gap-6 border border-gray-200 dark:border-gray-800 rounded-lg p-4"
  >
    <div class="rounded-md overflow-hidden w-1/2">
      <NuxtImg src="/assets/recipeImg.jpg" />
    </div>

    <div class="flex flex-col gap-4 w-1/2">
      <div class="flex w-full justify-between">
        <div class="text-3xl font-extrabold text-gray-700 dark:text-gray-400">
          {{ recipe.name }}
        </div>
        <div class="flex gap-2 items-center text-gray-700 dark:text-gray-400">
          <div class="font-semibold">{{ recipe.nbPersons }}</div>
          <UIcon name="fa6-solid:utensils"></UIcon>
        </div>
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-400">
        Description
      </div>
      <div class="text-sm font-medium">
        {{ recipe.description || "Pas de description" }}
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-400">
        Ingrédients
      </div>
      <div class="grid grid-cols-2">
        <template
          v-for="ingredient in recipe.ingredients"
          :key="ingredient.name"
        >
          <div>{{ ingredient.name }}</div>
          <div class="flex gap-2">
            <div>{{ ingredient.quantity }}</div>
            <div>{{ ingredient.unit }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
