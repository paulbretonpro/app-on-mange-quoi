<script setup lang="ts">
import type { IRecipe } from "~/types";

defineProps<{
  recipe: IRecipe;
}>();

const modalIsOpen = ref(false);

const handlePostNewMenu = () => {
  modalIsOpen.value = true;
};
</script>
<template>
  <UCard class="min-w-56">
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

  <LazyRecipeModalChooseWeekAndDay
    v-model="modalIsOpen"
    v-if="modalIsOpen"
    :recipe-id="recipe.id"
  />
</template>
