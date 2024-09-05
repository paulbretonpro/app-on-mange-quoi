<script setup lang="ts">
import { useFormCreate } from "~/composables/recipes/useFormCreate";

const { data: categories } = useFetch("/api/categories");

const showModalAddIngredient = ref(false);
const { form, schema } = useFormCreate();

const handleCreateNewRecipe = async () => {
  try {
    await Promise.all([
      // Create a new recipe
      $fetch("/api/recipes", {
        method: "POST",
        body: {
          name: form.value.name,
          description: form.value.description,
          nbPersons: form.value.nbPersons,
        },
      }),

      // Add image
      //$fetch("/api/images", {
      //  method: "POST",
      //  body: {
      //    id: null,
      //    file: null,
      //  },
      //}),
    ]);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <UForm
    :schema="schema"
    :state="form"
    class="space-y-4"
    @submit="handleCreateNewRecipe"
  >
    <UFormGroup label="Photo" name="image">
      <UInput type="file" icon="i-heroicons-folder" ref="inputImageRef" />
    </UFormGroup>
    <UFormGroup label="Nom" name="name">
      <UInput v-model="form.name" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="form.description" />
    </UFormGroup>

    <UFormGroup label="Nombre de personnes" name="nbPersons">
      <UInput type="number" v-model="form.nbPersons" />
    </UFormGroup>

    <UFormGroup label="Catégorie" name="category">
      <USelectMenu
        v-model="form.category"
        name="category"
        :options="categories"
        option-attribute="name"
        value-attribute="id"
      ></USelectMenu>
    </UFormGroup>

    <UFormGroup label="Ingrédients">
      <UButton variant="outline" @click="showModalAddIngredient = true"
        >Ajouter un ingrédient</UButton
      >
    </UFormGroup>

    <UButton type="submit" block> Ajouter </UButton>
  </UForm>

  <LazyRecipeSearchIngredients
    v-if="showModalAddIngredient"
    @close="showModalAddIngredient = false"
  />
</template>
