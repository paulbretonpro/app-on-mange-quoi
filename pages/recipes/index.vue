<script setup lang="ts">
import type { ICategory } from "~/types";

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
const orderBy = ref("name");
const page = ref(1);

const { data: recipes, status: statusRecipes } = await useLazyAsyncData(
  "recipes",
  () =>
    $fetch("/api/recipes", {
      params: {
        categoriesId: categoriesSelected.value,
        perPage: 10,
        page: page.value,
        orderBy: orderBy.value,
        descending: true,
      },
    }),
  {
    watch: [categoriesSelected.value, page, orderBy],
  }
);

const { data: categories, status: statusCategories } = useLazyFetch<
  ICategory[]
>("/api/categories", {
  default: () => [],
});

const handleSelectCategory = (categoryId: number) => {
  const index = categoriesSelected.value.findIndex(
    (catId) => catId === categoryId
  );
  if (index === -1) {
    categoriesSelected.value.push(categoryId);
  } else {
    categoriesSelected.value.splice(index, 1);
  }
};
</script>
<template>
  <div class="text-3xl font-extrabold mb-6">Recettes</div>

  <SkeletonListCategories v-if="statusCategories === 'pending'" />

  <div v-else class="flex gap-4 justify-between mb-6 w-full">
    <ListCategories
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

  <SkeletonMenuCard v-if="statusRecipes === 'pending'" />
  <template v-else>
    <div
      class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      v-if="recipes?.length"
    >
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>

    <div v-else class="flex w-full justify-center">Aucune recette</div>
  </template>
</template>
