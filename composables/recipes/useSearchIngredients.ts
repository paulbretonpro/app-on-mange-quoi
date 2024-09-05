import type { IIngredientQuantity } from "~/types";

export const useSearchIngredients = () => {
  const loading = ref(false);

  const searchFn = async (search: string) => {
    loading.value = true;

    const ingredientsOptions = await $fetch<IIngredientQuantity[]>(
      "/api/ingredients",
      {
        params: { search },
      }
    );

    loading.value = false;

    return ingredientsOptions ?? [];
  };

  return {
    loading,
    searchFn,
  };
};
