<script setup lang="ts">
import type { IRecipe } from "~/types";

const props = defineProps<{
  recipes: IRecipe[];
  recipesIsLoading: boolean;
}>();

const showEmptyMessage = computed(
  () => props.recipes.length === 0 && props.recipesIsLoading === false
);
</script>
<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :is-loading="recipesIsLoading"
      :recipe="recipe"
    />
  </div>
  <div v-if="showEmptyMessage" class="flex w-full justify-center">
    Aucune recette
  </div>
</template>
