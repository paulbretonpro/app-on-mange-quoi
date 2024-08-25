<script setup lang="ts">
import type { ICategory } from "~/types";

definePageMeta({
  layout: false,
});

const nuxtApp = useNuxtApp();

const { data: categories, status: statusCategories } = await useLazyFetch<
  ICategory[]
>("/api/categories", {
  default: () => [],
  key: "categories",
  getCachedData(key) {
    return nuxtApp.payload.data[key];
  },
});

const categoriesIsLoading = computed(
  () => statusCategories.value === "pending"
);
</script>
<template>
  <div class="flex flex-col min-h-screen bg-primary-500 dark:bg-slate-900">
    <HeaderHome />
    <div
      class="py-6 px-4 bg-white dark:bg-slate-950 grow rounded-t-2xl z-10 flex flex-col gap-8 min-h-screen"
    >
      <div class="section-categories">
        <div class="text-xl font-extrabold mb-6">Categories</div>
        <ListCategories
          :is-loading="categoriesIsLoading"
          :categories="categories"
          :categories-selected="[]"
        />
      </div>
      <div class="text-xl font-extrabold mb-6">Recettes du moment</div>
      <div>soon</div>
      <div class="text-xl font-extrabold mb-6">Recettes</div>
      <div>soon</div>
    </div>
  </div>
  <NavigationBar />
</template>
