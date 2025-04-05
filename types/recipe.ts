export interface Ingredient {
    id: string;
    name: string;
    category: IngredientCategory;
    image?: string;
}

export enum IngredientCategory {
    PROTEIN = 'protein',
    VEGETABLE = 'vegetable',
    FRUIT = 'fruit',
    GRAIN = 'grain',
    DAIRY = 'dairy',
    HERB = 'herb',
    SPICE = 'spice',
    OIL = 'oil',
    OTHER = 'other',
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions: string[];
    cookingTime: number; // in minutes
    servings: number;
    difficulty: 'easy' | 'medium' | 'hard';
    cuisine: string;
    image: string;
    tags: string[];
}

export interface RecipeIngredient {
    ingredientId: string;
    name: string;
    amount: string;
    optional?: boolean;
}