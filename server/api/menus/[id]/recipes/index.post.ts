import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const menuId = getRouterParam(event, "id") as string;
  const { recipeId, dayNumber, isLunch } = await readBody(event);

  if (user) {
    const { data, error } = await client
      .from("weeks_menus_recipes")
      .insert({
        weeks_menus_id: menuId,
        recipe_id: recipeId,
        day: dayNumber,
        lunch: isLunch,
      })
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return transformObjectKeys(data);
  } else {
    throw new Error("Unauthorized");
  }
});
