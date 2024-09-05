import { serverSupabaseClient } from "#supabase/server";
import { Table } from "~/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data: Categories } = await supabase
    .from(Table.categories)
    .select("*")
    .order("name");

  return Categories;
});
