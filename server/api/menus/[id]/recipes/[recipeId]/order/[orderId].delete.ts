import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Table } from "~/types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const menuId = getRouterParam(event, "id") as string;
  const recipeId = getRouterParam(event, "recipeId") as string;
  const order = getRouterParam(event, "orderId") as string;

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!menuId || !recipeId) {
    throw new Error("Invalid request: missing menuId or recipeId");
  }

  const { data: isMyMenu } = await client
    .from(Table.weeksMenus)
    .select("*")
    .eq("id", menuId)
    .eq("owner_id", user.id)
    .single();

  if (!isMyMenu) {
    throw new Error("Menu not found");
  }

  const { error } = await client
    .from(Table.weeksMenusRecipes)
    .delete()
    .eq("id", order);

  if (error) {
    throw new Error(error.message);
  }
});
