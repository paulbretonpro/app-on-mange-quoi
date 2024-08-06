import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (user) {
    const { data, error } = await client
      .from("weeks_menus")
      .select("*")
      .eq("owner_id", user?.id)
      .order("week_number", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return transformObjectKeys(data);
  } else {
    throw new Error("Unauthorized");
  }
});
