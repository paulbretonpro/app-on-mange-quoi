export enum Table {
  categories = "categories",
  ingredients = "ingredients",
  recipes = "recipes",
  weeksMenus = "weeks_menus",
  weeksMenusRecipes = "weeks_menus_recipes",
  shoppingLists = "shopping_lists",
}

export enum FormMessages {
  required = "Ce champ est obligatoire",
  number = "La valeur doit être un nombre",
  min0 = "La valeur doit être supérieure à 0",
}

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
  perPage: string;
  page: string;
  categoriesId?: string[];
  descending?: boolean;
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

export interface IMenu {
  id: string;
  weekNumber: number;
  ownerId: string;
  createdAt: Date;
}

export interface IMenuRecipes {
  id: string;
  weekNumber: number;
  recipes: {
    day: number;
    lunch: boolean;
    recipe: IRecipe;
  }[];
}

export interface IShoppingList {
  weeksMenusId: string;
  name: string;
  quantity: number;
  unit: string;
}
