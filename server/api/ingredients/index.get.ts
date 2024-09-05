import { serverSupabaseClient } from "#supabase/server";
import { IGetRequest } from "~/server/request/ingredients/get";
import { Table } from "~/types";
import { transformObjectKeys } from "~/utils/case-transformer";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { search } = getQuery<IGetRequest>(event);

  let query = client.from(Table.ingredients).select("*").order("name");

  if (search && search?.length >= 3) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return transformObjectKeys(data);
});
