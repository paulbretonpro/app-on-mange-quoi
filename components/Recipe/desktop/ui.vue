<script setup lang="ts">
import type { IRecipe } from "~/types";

defineProps<{
  recipe: IRecipe;
}>();
</script>
<template>
  <div class="flex gap-6 border rounded-lg p-4">
    <div class="rounded-md overflow-hidden">
      <NuxtImg src="/assets/recipeImg.jpg" />
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div>{{ recipe.name }}</div>
        <div>{{ recipe.nbPersons }}</div>
      </div>
      <div>{{ recipe.description }}</div>
    </div>
  </div>
</template>
