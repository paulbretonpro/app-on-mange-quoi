import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { transformObjectKeys } from "~/utils/case-transformer";
import { Table } from "~/types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { weekNumber } = await readBody(event);

  if (user) {
    const { data, error } = await client
      .from(Table.weeksMenus)
      .insert({ owner_id: user?.id, week_number: weekNumber })
      .select("*");

    if (error) {
      throw new Error(error.message);
    }
    return transformObjectKeys(data);
  } else {
    throw new Error("Unauthorized");
  }
});
