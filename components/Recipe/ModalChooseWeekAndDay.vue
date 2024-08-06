<script setup lang="ts">
const props = defineProps<{
  recipeId: string;
}>();

const isOpen = defineModel();

const selectedDay = ref();
const menuSelected = ref();
const errorAddRecipe = ref(false);

const handleAddRecipe = async () => {
  errorAddRecipe.value = false;

  try {
    const data = await $fetch(`/api/menus/${menuSelected.value}/recipes`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: {
        recipeId: props.recipeId,
        dayNumber: selectedDay.value.value.day,
        isLunch: selectedDay.value.value.isLunch,
      },
    });

    isOpen.value = false;
  } catch (error) {
    errorAddRecipe.value = true;
  }
};

watch([selectedDay, menuSelected], () => {
  errorAddRecipe.value = false;
});
</script>

<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Choisir le menu et le jour
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <div class="flex gap-4 w-full mb-4">
        <MenuChooseMenu class="grow" v-model:menuSelected="menuSelected" />
        <ChooseDay class="grow" v-model:selectedDay="selectedDay" />
      </div>

      <div v-if="errorAddRecipe" class="text-sm font-semibold text-red-500">
        Recette déjà ajouter pour {{ selectedDay.name }}
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="outline" @click="isOpen = false">Annuler</UButton>
          <UButton @click="handleAddRecipe">Valider</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
