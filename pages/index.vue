<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { data: categories, status: statusCategories } = await useLazyFetch<
  ICategory[]
>("/api/categories", {
  default: () => [],
});

const categoriesIsLoading = computed(
  () => statusCategories.value === "pending"
);
</script>
<template>
  <div class="flex flex-col min-h-screen bg-primary-500 dark:bg-slate-900">
    <HeaderHome />
    <div
      class="py-6 px-4 bg-white dark:bg-slate-950 grow rounded-t-2xl z-10 flex flex-col gap-8"
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
      <div class="text-xl font-extrabold mb-6">Recettes</div>
    </div>
  </div>
  <NavigationBar />
</template>
