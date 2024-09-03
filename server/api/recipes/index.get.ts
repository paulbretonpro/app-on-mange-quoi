import { serverSupabaseClient } from "#supabase/server";
import { IRecipeParams } from "~/types";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const {
    perPage = "10",
    page = "1",
    orderBy = "created_at",
    descending = true,
    categoriesId,
  } = getQuery<IRecipeParams>(event);

  let query = client.from("recipes").select("*");
  let countTotalRecipes = client
    .from("recipes")
    .select("*", { count: "exact", head: true });

  if (categoriesId && categoriesId?.length > 0) {
    query = query.in("category_id", categoriesId);
    countTotalRecipes = countTotalRecipes.in("category_id", categoriesId);
  }

  // Get Total recipes by category
  const { count: totalRecipes, error: errorTotalRecipes } =
    await countTotalRecipes;

  if (errorTotalRecipes) {
    throw new Error(errorTotalRecipes.message);
  }

  // Get recipes paginated by category
  query = query.order(orderBy);

  const from = (parseInt(page) - 1) * parseInt(perPage);
  const to = from + parseInt(perPage) - 1;

  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: transformObjectKeys(data),
    total: totalRecipes,
  };
});
