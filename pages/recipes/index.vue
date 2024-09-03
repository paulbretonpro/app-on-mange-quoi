<script setup lang="ts">
import type { ICategory, IRecipe } from "~/types";
import { useInfiniteScroll } from "@vueuse/core";

const nuxtApp = useNuxtApp();

const categoriesSelected = ref<number[]>([]);
const optionsSort = [
  {
    name: "Nom",
    value: "name",
  },
  {
    name: "Date de création",
    value: "created_at",
  },
];

const recipesRef = ref<HTMLElement | null>(null);
const recipes = ref<IRecipe[]>([]);
const orderBy = ref("name");
const page = ref(0);
const perPage = ref(2);
const total = ref<number | undefined>(undefined);
const loading = ref(true);

const fetchRecipes = async () => {
  if (total.value === undefined || total.value > recipes.value.length) {
    loading.value = true;
    page.value++;

    // TODO: Save key in nuxt payload
    const response = await $fetch<{ data: IRecipe[]; total: number }>(
      "/api/recipes",
      {
        params: {
          categoriesId: categoriesSelected.value,
          perPage: perPage.value,
          page: page.value,
          orderBy: orderBy.value,
          descending: true,
        },
      }
    );

    total.value = response.total;
    recipes.value = [...recipes.value, ...response.data];

    loading.value = false;
  }
};

const reset = () => {
  page.value = 0;
  total.value = undefined;
  recipes.value = [];
};

const { reset: resetInfineScroll } = useInfiniteScroll(
  recipesRef,
  async () => {
    await fetchRecipes();
  },
  { distance: 10 }
);

const { data: categories, status: statusCategories } = await useLazyFetch<
  ICategory[]
>("/api/categories", {
  default: () => [],
  key: "categories",
  getCachedData(key) {
    return nuxtApp.payload.data[key];
  },
});

const handleSelectCategory = async (categoryId: number) => {
  const index = categoriesSelected.value.findIndex(
    (catId) => catId === categoryId
  );
  if (index === -1) {
    categoriesSelected.value.push(categoryId);
  } else {
    categoriesSelected.value.splice(index, 1);
  }

  reset();
  resetInfineScroll();

  fetchRecipes();
};

const categoriesIsLoading = computed(
  () => statusCategories.value === "pending"
);
</script>

<template>
  <div class="flex flex-col h-[90vh] overflow-hidden">
    <div class="text-3xl font-extrabold mb-6">Recettes</div>

    <div class="flex gap-4 justify-between mb-6 w-full">
      <ListCategories
        :is-loading="categoriesIsLoading"
        :categories="categories"
        :categories-selected="categoriesSelected"
        @update:categories-selected="handleSelectCategory"
      />
      <USelectMenu
        v-model="orderBy"
        :options="optionsSort"
        value-attribute="value"
        option-attribute="name"
        class="!w-48"
      />
    </div>

    <div ref="recipesRef" class="flex flex-col gap-4 overflow-y-auto">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe />

      <RecipeListSkeleton class="mt-4" v-if="loading" :nb-recipes="perPage" />
      <div
        v-else-if="!loading && recipes.length === 0"
        class="flex w-full justify-center"
      >
        Aucune recette
      </div>
    </div>
  </div>
</template>
