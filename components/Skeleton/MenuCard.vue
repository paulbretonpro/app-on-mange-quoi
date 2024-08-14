<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="index in 5"
      class="animate-pulse border border-gray-200 dark:border-gray-600 rounded-md px-4 py-3 h-40 w-full flex flex-col"
    >
      <div class="grow flex items-center justify-center">
        <div class="w-16 h-8 bg-slate-700 rounded-full"></div>
      </div>
      <div class="flex gap-4">
        <div class="w-full h-3 bg-slate-700 rounded"></div>
        <div class="w-8 h-3 bg-slate-700 rounded"></div>
        <div class="w-20 h-3 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</template>
