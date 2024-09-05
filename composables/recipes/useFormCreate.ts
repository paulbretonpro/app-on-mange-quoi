import { object, string, number, type InferType } from "yup";
import { FormMessages } from "~/types";

export const useFormCreate = () => {
  const schema = object({
    name: string().required(FormMessages.required),
    description: string().required(FormMessages.required),
    nbPersons: number()
      .min(1, FormMessages.min0)
      .required(FormMessages.required)
      .typeError(""),
    category: string().required(FormMessages.required),
  });

  type Schema = InferType<typeof schema>;

  const form = ref({
    name: undefined,
    description: undefined,
    nbPersons: undefined,
    category: undefined,
  });

  return {
    schema,
    form,
  };
};
