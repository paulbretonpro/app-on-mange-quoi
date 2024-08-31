<script setup lang="ts">
import type { IMenuRecipes, IRecipe } from "~/types";

useSeoMeta({
  title: "Menu",
  description: "Gérez vos menus de la semaine",
});

interface IMenuByDay {
  day: number;
  dayName: string;
  lunch: {
    id: string;
    recipe: IRecipe;
  }[];
  dinner: {
    id: string;
    recipe: IRecipe;
  }[];
}

const route = useRoute();

const { data, refresh, status } = await useLazyFetch<IMenuRecipes | null>(
  `/api/menus/${route.params.id}/recipes`
);

const planningByDay = computed<IMenuByDay[]>(() => {
  const defaultPlanningByDay: IMenuByDay[] = [
    {
      day: 0,
      dayName: "Lundi",
      lunch: [],
      dinner: [],
    },
    {
      day: 1,
      dayName: "Mardi",
      lunch: [],
      dinner: [],
    },
    {
      day: 2,
      dayName: "Mercredi",
      lunch: [],
      dinner: [],
    },
    {
      day: 3,
      dayName: "Jeudi",
      lunch: [],
      dinner: [],
    },
    {
      day: 4,
      dayName: "Vendredi",
      lunch: [],
      dinner: [],
    },
    {
      day: 5,
      dayName: "Samedi",
      lunch: [],
      dinner: [],
    },
    {
      day: 6,
      dayName: "Dimanche",
      lunch: [],
      dinner: [],
    },
  ];
  data.value?.recipes.forEach(
    (menu: { day: number; lunch: boolean; recipe: IRecipe }) => {
      const day = menu.day;
      if (day === 0) {
        if (menu.lunch) defaultPlanningByDay[0].lunch.push(menu);
        else defaultPlanningByDay[0].dinner.push(menu);
      } else if (day === 1) {
        if (menu.lunch) defaultPlanningByDay[1].lunch.push(menu);
        else defaultPlanningByDay[1].dinner.push(menu);
      } else if (day === 2) {
        if (menu.lunch) defaultPlanningByDay[2].lunch.push(menu);
        else defaultPlanningByDay[2].dinner.push(menu);
      } else if (day === 3) {
        if (menu.lunch) defaultPlanningByDay[3].lunch.push(menu);
        else defaultPlanningByDay[3].dinner.push(menu);
      } else if (day === 4) {
        if (menu.lunch) defaultPlanningByDay[4].lunch.push(menu);
        else defaultPlanningByDay[4].dinner.push(menu);
      } else if (day === 5) {
        if (menu.lunch) defaultPlanningByDay[5].lunch.push(menu);
        else defaultPlanningByDay[5].dinner.push(menu);
      } else if (day === 6) {
        if (menu.lunch) defaultPlanningByDay[6].lunch.push(menu);
        else defaultPlanningByDay[6].dinner.push(menu);
      }
    }
  );

  return defaultPlanningByDay;
});

const handleDeleteRecipe = async (
  recipeId: string,
  weeksMenusRecipesId: string
) => {
  await fetch(
    `/api/menus/${route.params.id}/recipes/${recipeId}/order/${weeksMenusRecipesId}`,
    {
      method: "DELETE",
    }
  );
  await refresh();
};

const isLoading = computed(() => status.value === "pending");
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="text-3xl font-extrabold mb-6">
      Semaine {{ data?.weekNumber }}
    </div>
    <NuxtLink :to="`/menus/${route.params.id}/shopping-list`">
      <UButton>Voir les courses</UButton>
    </NuxtLink>
  </div>

  <div v-if="isLoading">
    <MenuSkeleton v-for="menu in 7" :key="menu" />
  </div>
  <div
    v-else
    v-for="menu in planningByDay"
    :key="menu.dayName"
    class="flex flex-col gap-2 mb-12 w-full"
  >
    <div class="text-sm md:text-base font-medium flex items-center gap-2">
      <UIcon name="i-heroicons-calendar" size="sm" />
      <div>{{ menu.dayName }}</div>
    </div>
    <div
      v-if="menu.lunch.length === 0 && menu.dinner.length === 0"
      class="text-sm text-gray-400 dark:text-gray-600"
    >
      Aucun repas
    </div>
    <div v-else class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2 grow">
        <span class="text-xs text-gray-400 dark:text-gray-600">Midi</span>
        <MenuRecipeCard
          v-for="lunch in menu.lunch"
          :recipe="lunch.recipe"
          @handle-delete-recipe="handleDeleteRecipe(lunch.recipe.id, lunch.id)"
        />
      </div>
      <div class="flex flex-col gap-2 grow">
        <span class="text-xs text-gray-400 dark:text-gray-600">Soir</span>
        <MenuRecipeCard
          v-for="dinner in menu.dinner"
          :recipe="dinner.recipe"
          @handle-delete-recipe="
            handleDeleteRecipe(dinner.recipe.id, dinner.id)
          "
        />
      </div>
    </div>
  </div>
</template>
