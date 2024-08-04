<script setup lang="ts">
import type { IRecipe } from "~/types";

defineProps<{
  recipe: IRecipe;
}>();
</script>
<template>
  <UCard class="min-w-56">
    <div class="flex items-center justify-center">
      <UIcon name="fa6-solid:bowl-food" class="w-12 h-12 text-primary" />
    </div>

    <template #footer>
      <div class="flex gap-4 justify-between">
        <div class="whitespace-nowrap text-ellipsis overflow-hidden">
          {{ recipe.name }}
        </div>
        <div>{{ recipe.nbPersons }}</div>
      </div>
    </template>
  </UCard>
</template>
