import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/types/recipe';
import recipes from '@/mocks/recipes';
import ingredients from '@/mocks/ingredients';

interface RecipeState {
    selectedIngredients: string[];
    favoriteRecipes: string[];
    recentlyViewed: string[];
    addIngredient: (id: string) => void;
    removeIngredient: (id: string) => void;
    clearIngredients: () => void;
    toggleFavorite: (recipeId: string) => void;
    addToRecentlyViewed: (recipeId: string) => void;
    getMatchingRecipes: () => Recipe[];
    getRecipeById: (id: string) => Recipe | undefined;
    getMatchScore: (recipe: Recipe) => number;
}

export const useRecipeStore = create<RecipeState>()(
    persist(
        (set, get) => ({
            selectedIngredients: [],
            favoriteRecipes: [],
            recentlyViewed: [],

            addIngredient: (id: string) => {
                set((state) => ({
                    selectedIngredients: [...state.selectedIngredients, id],
                }));
            },

            removeIngredient: (id: string) => {
                set((state) => ({
                    selectedIngredients: state.selectedIngredients.filter((i) => i !== id),
                }));
            },

            clearIngredients: () => {
                set({ selectedIngredients: [] });
            },

            toggleFavorite: (recipeId: string) => {
                set((state) => {
                    if (state.favoriteRecipes.includes(recipeId)) {
                        return {
                            favoriteRecipes: state.favoriteRecipes.filter((id) => id !== recipeId),
                        };
                    } else {
                        return {
                            favoriteRecipes: [...state.favoriteRecipes, recipeId],
                        };
                    }
                });
            },

            addToRecentlyViewed: (recipeId: string) => {
                set((state) => {
                    const filtered = state.recentlyViewed.filter((id) => id !== recipeId);
                    return {
                        recentlyViewed: [recipeId, ...filtered].slice(0, 10), // Keep only 10 most recent
                    };
                });
            },

            getMatchingRecipes: () => {
                const { selectedIngredients } = get();

                if (selectedIngredients.length === 0) {
                    return recipes;
                }

                // Sort recipes by how many ingredients match
                return [...recipes].sort((a, b) => {
                    const scoreA = get().getMatchScore(a);
                    const scoreB = get().getMatchScore(b);
                    return scoreB - scoreA;
                });
            },

            getRecipeById: (id: string) => {
                return recipes.find((recipe) => recipe.id === id);
            },

            getMatchScore: (recipe: Recipe) => {
                const { selectedIngredients } = get();

                if (selectedIngredients.length === 0) {
                    return 0;
                }

                // Count how many selected ingredients are in the recipe
                const recipeIngredientIds = recipe.ingredients.map((i) => i.ingredientId);
                const matchingIngredients = selectedIngredients.filter((id) =>
                    recipeIngredientIds.includes(id)
                );

                // Calculate percentage of recipe ingredients that are matched
                const matchPercentage = matchingIngredients.length / recipeIngredientIds.length;

                // Calculate percentage of selected ingredients that are used
                const usePercentage = matchingIngredients.length / selectedIngredients.length;

                // Combine scores with more weight on usePercentage
                return (matchPercentage * 0.4) + (usePercentage * 0.6);
            },
        }),
        {
            name: 'recipe-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                favoriteRecipes: state.favoriteRecipes,
                recentlyViewed: state.recentlyViewed,
            }),
        }
    )
);