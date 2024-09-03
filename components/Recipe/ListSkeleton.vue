<script setup lang="ts">
defineProps<{
  nbRecipes: number;
}>();
</script>
<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="index in nbRecipes"
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
  </div>
</template>
