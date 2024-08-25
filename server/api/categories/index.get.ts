import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data: Categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return Categories;
});
