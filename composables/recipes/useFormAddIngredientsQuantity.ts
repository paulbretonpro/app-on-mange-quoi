import { object, string, number, type InferType } from "yup";
import { FormMessages } from "~/types";

export const useFormAddIngredientsQuantity = () => {
  const schema = object({
    ingredientId: string().required(FormMessages.required),
    quantity: number().positive().required(FormMessages.required).typeError(""),
  });

  type Schema = InferType<typeof schema>;

  const form = ref({
    ingredientId: undefined,
    quantity: undefined,
    unit: undefined,
  });

  return {
    schema,
    form,
  };
};
