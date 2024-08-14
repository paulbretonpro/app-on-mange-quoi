<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div
    class="border dark:border-gray-800 rounded-md w-full px-4 py-2 flex gap-4 justify-between items-center"
  >
    <div>{{ name }}</div>
    <UButton icon="i-heroicons-trash" variant="ghost" color="red" />
  </div>
</template>
