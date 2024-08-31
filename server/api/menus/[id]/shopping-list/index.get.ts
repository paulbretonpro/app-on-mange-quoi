import { serverSupabaseClient } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const menuId = getRouterParam(event, "id") as string;

  if (menuId !== undefined) {
    const { data, error } = await client
      .from("shopping_list_week_menu")
      .select("*")
      .eq("weeks_menus_id", menuId);

    if (error) {
      throw new Error(error.message);
    }
    return transformObjectKeys(data);
  } else {
    throw new Error("You must provide a menuId");
  }
});
