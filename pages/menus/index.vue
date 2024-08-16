<script setup lang="ts">
const { data, refresh, status } = await useLazyFetch("/api/menus");

const isOpen = ref(false);

const isLoading = computed(() => status.value === "pending");
</script>
<template>
  <div class="mb-6 flex justify-between">
    <div class="text-3xl font-extrabold">Mes Menus</div>
    <UButton icon="i-heroicons-plus" @click="isOpen = true"></UButton>
  </div>
  <div class="flex flex-col gap-4 md:w-96">
    <MenuCard
      v-for="menu in data"
      :key="menu.id"
      :menu="menu"
      :is-loading="isLoading"
    />
  </div>
  <LazyMenuModalChooseWeek
    v-if="isOpen"
    v-model="isOpen"
    @refresh="refresh()"
  />
</template>
