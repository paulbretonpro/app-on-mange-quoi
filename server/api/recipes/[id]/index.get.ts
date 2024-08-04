import { serverSupabaseClient } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const recipeId = getRouterParam(event, "id") as string;

  // Select recipe by id with their ingredients and category
  const { data, error } = await client
    .from("recipes")
    .select(
      "*, ingredients:ingredients_recipes(quantity, unit, ...ingredients(name)), category:categories(*)"
    )
    .eq("id", recipeId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return transformObjectKeys(data);
});
