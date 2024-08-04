export interface IRecipe {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  isPublic: boolean;
  nbPersons: number;
  categoryId: number;
  createdAt: Date;

  category?: ICategory;
  ingredients?: IIngredientQuantity[];
}

export interface IRecipeParams {
  perPage: number;
  page: number;
  categoriesId?: number[];
  sortBy?: string;
  orderBy?: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IIngredientQuantity {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}
