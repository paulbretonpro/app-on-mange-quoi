<script setup lang="ts">
import type { ICategory } from "~/types";

withDefaults(
  defineProps<{
    isLoading?: boolean;
    categories: ICategory[];
    categoriesSelected: number[];
  }>(),
  {
    isLoading: false,
  }
);

const emit = defineEmits<{
  "update:categoriesSelected": [number];
}>();
</script>
<template>
  <div class="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2">
    <UButton
      v-if="!isLoading"
      class="whitespace-nowrap"
      :class="{
        'snap-start': index >= 0 && index < categories.length - 1,
        'snap-end': index === categories.length - 1,
      }"
      v-for="(item, index) in categories"
      :key="item.id"
      :variant="categoriesSelected.includes(item.id) ? 'solid' : 'outline'"
      @click="emit('update:categoriesSelected', item.id)"
      >{{ item.name }}</UButton
    >
    <SkeletonButton v-else v-for="index in 4" :key="index"></SkeletonButton>
  </div>
</template>
