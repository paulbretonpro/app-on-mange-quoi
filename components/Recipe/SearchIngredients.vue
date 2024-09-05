<script setup lang="ts">
import { useFormAddIngredientsQuantity } from "~/composables/recipes/useFormAddIngredientsQuantity";
import { useSearchIngredients } from "~/composables/recipes/useSearchIngredients";

const emit = defineEmits(["close"]);

const unitOptions = ref([
  "g",
  "kg",
  "ml",
  "cl",
  "l",
  "unité",
  "c.a.s",
  "c.a.c",
  "sachet",
]);

const { form, schema } = useFormAddIngredientsQuantity();
const { loading, searchFn } = useSearchIngredients();

const handleAddIngredient = async () => {
  console.log(form);
};

const resetForm = () => {
  form.value = {
    ingredientId: undefined,
    quantity: undefined,
    unit: undefined,
  };

  emit("close");
};
</script>
<template>
  <div class="absolute top-0 left-0 h-screen w-screen backdrop-blur"></div>
  <div
    class="absolute bottom-0 left-0 dark:bg-slate-800 rounded-t-3xl w-screen z-50"
  >
    <div
      class="w-14 h-1 rounded-full bg-slate-600 absolute top-2 left-1/2 transform -translate-x-1/2"
    ></div>
    <div class="content px-4 py-10">
      <div class="text-md font-semibold mb-6">Ajouter un ingredient</div>
      <UForm :schema="schema" :state="form" @submit="handleAddIngredient">
        <div class="flex gap-6 mb-8">
          <UFormGroup label="Ingrédient" name="ingredient" class="flex-1">
            <USelectMenu
              v-model="form.ingredientId"
              :loading="loading"
              :searchable="searchFn"
              :debounce="300"
              option-attribute="name"
              value-attribute="id"
            ></USelectMenu>
          </UFormGroup>
          <UFormGroup label="Quantité" name="quantity">
            <UInput v-model="form.quantity" type="number" class="w-16" />
          </UFormGroup>
          <UFormGroup label="Unité" name="unit">
            <USelectMenu
              v-model="form.unit"
              :options="unitOptions"
              class="w-16"
            />
          </UFormGroup>
        </div>
        <div class="flex gap-4 justify-end">
          <UButton variant="outline" @click="resetForm">Annuler</UButton>
          <UButton type="submit">Valider</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
