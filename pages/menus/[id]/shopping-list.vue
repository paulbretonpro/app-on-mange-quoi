<script setup lang="ts">
import type { IShoppingList } from "~/types";

const route = useRoute();

const { data, status } = await useLazyFetch<IShoppingList[]>(
  `/api/menus/${route.params.id}/shopping-list`
);

const isLoading = computed(() => status.value === "pending");
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <template v-else>
    <div class="text-3xl font-extrabold mb-6">Liste de courses</div>
    <div class="flex flex-col gap-4">
      <div
        v-for="ingredient in data"
        :key="ingredient.weeksMenusId"
        class="flex gap-6 items-center"
      >
        <UCheckbox :ui="{ base: 'h-6 w-6' }" />

        <div class="flex gap-4 grow items-center justify-between">
          <div class="text-lg font-bold first-letter:uppercase">
            {{ ingredient.name }}
          </div>
          <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
        </div>
      </div>
    </div>
  </template>
</template>
