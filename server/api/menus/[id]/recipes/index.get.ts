import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";
import { Table } from "~/types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const menuId = getRouterParam(event, "id") as string;

  if (user) {
    const { data, error } = await client
      .from(Table.weeksMenus)
      .select("*, recipes:weeks_menus_recipes(*, recipe:recipes(id, name))")
      .eq("owner_id", user.id)
      .eq("id", menuId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return transformObjectKeys(data);
  } else {
    throw new Error("Unauthorized");
  }
});
