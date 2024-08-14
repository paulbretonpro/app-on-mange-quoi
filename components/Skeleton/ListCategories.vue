<template>
  <div class="flex gap-2">
    <div
      v-for="index in 5"
      class="animate-pulse border border-gray-200 dark:border-gray-600 rounded-md px-4 py-3 w-16"
    >
      <div class="h-2 bg-slate-700 rounded"></div>
    </div>
  </div>
</template>
