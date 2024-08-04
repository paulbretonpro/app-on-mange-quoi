<script setup lang="ts">
import type { IRecipe } from "~/types";

const route = useRoute();
const { isMobile } = useDevice();

const { data: recipe } = useFetch<IRecipe>(`/api/recipes/${route.params.id}`);
</script>
<template>
  <RecipeMobileUi v-show="isMobile" v-if="recipe" :recipe="recipe" />
  <RecipeDesktopUi v-show="!isMobile" v-if="recipe" :recipe="recipe" />
</template>
