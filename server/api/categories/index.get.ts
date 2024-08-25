import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  await new Promise((r) => setTimeout(r, 3000));

  const { data: Categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return Categories;
});
