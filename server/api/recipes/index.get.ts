import { serverSupabaseClient } from "#supabase/server";
import { IRecipeParams } from "~/types";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const {
    perPage = 10,
    page = 1,
    orderBy = "created_at",
    descending = true,
    categoriesId,
  } = getQuery<IRecipeParams>(event);

  let query = client.from("recipes").select("*");

  if (categoriesId && categoriesId?.length > 0) {
    query = query.in("category_id", categoriesId);
  }

  console.log("order", query);
  query = query.order(orderBy);

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return transformObjectKeys(data);
});
