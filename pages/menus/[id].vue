<script setup lang="ts">
import type { IMenuRecipes, IRecipe } from "~/types";

interface IMenuByDay {
  day: number;
  dayName: string;
  lunch: IRecipe[];
  dinner: IRecipe[];
}

const route = useRoute();

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

const { data } = useFetch<IMenuRecipes | null>(
  `/api/menus/${route.params.id}/recipes`
);

const planningByDay = computed<IMenuByDay[]>(() => {
  return data.value?.recipes.reduce(
    (acc, menu: { day: number; lunch: boolean; recipe: IRecipe }) => {
      const day = menu.day;
      if (day === 0) {
        if (menu.lunch) acc[0].lunch.push(menu.recipe);
        else acc[0].dinner.push(menu.recipe);
      } else if (day === 1) {
        if (menu.lunch) acc[1].lunch.push(menu.recipe);
        else acc[1].dinner.push(menu.recipe);
      } else if (day === 2) {
        if (menu.lunch) acc[2].lunch.push(menu.recipe);
        else acc[2].dinner.push(menu.recipe);
      } else if (day === 3) {
        if (menu.lunch) acc[3].lunch.push(menu.recipe);
        else acc[3].dinner.push(menu.recipe);
      } else if (day === 4) {
        if (menu.lunch) acc[4].lunch.push(menu.recipe);
        else acc[4].dinner.push(menu.recipe);
      } else if (day === 5) {
        if (menu.lunch) acc[5].lunch.push(menu.recipe);
        else acc[5].dinner.push(menu.recipe);
      } else if (day === 6) {
        if (menu.lunch) acc[6].lunch.push(menu.recipe);
        else acc[6].dinner.push(menu.recipe);
      }
      return acc;
    },
    defaultPlanningByDay
  ) as IMenuByDay[];
});
</script>

<template>
  <div class="text-3xl font-extrabold mb-6">Semaine {{ data?.weekNumber }}</div>
  <div
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
        <MenuRecipeCard v-for="lunch in menu.lunch" :name="lunch.name" />
      </div>
      <div class="flex flex-col gap-2 grow">
        <span class="text-xs text-gray-400 dark:text-gray-600">Soir</span>
        <MenuRecipeCard v-for="dinner in menu.dinner" :name="dinner.name" />
      </div>
    </div>
  </div>
</template>
