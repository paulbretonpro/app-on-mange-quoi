<script setup lang="ts">
import type { IRecipe } from "~/types";

defineProps<{
  recipe: IRecipe;
}>();

const emit = defineEmits(["handle-delete-recipe"]);

const handleDeleteRecipe = () => {
  emit("handle-delete-recipe");
};
</script>

<template>
  <div
    class="border dark:border-gray-800 rounded-md w-full px-4 py-2 flex gap-4 justify-between items-center"
  >
    <div>{{ recipe.name }}</div>
    <UButton
      icon="i-heroicons-trash"
      variant="ghost"
      color="red"
      @click="handleDeleteRecipe"
    />
  </div>
</template>
