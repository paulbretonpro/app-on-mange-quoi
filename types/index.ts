export interface IRecipe {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  isPublic: boolean;
  nbPersons: number;
  categoryId: number;
  createdAt: Date;
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
