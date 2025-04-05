import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ingredient, IngredientCategory } from '@/types/recipe';
import IngredientItem from './IngredientItem';
import Colors from '@/constants/colors';

interface CategorySectionProps {
    title: string;
    ingredients: Ingredient[];
    selectedIngredients: string[];
    onToggleIngredient: (id: string) => void;
}

export default function CategorySection({
    title,
    ingredients,
    selectedIngredients,
    onToggleIngredient,
}: CategorySectionProps) {
    if (ingredients.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ingredientsList}>
                {ingredients.map((ingredient) => (
                    <IngredientItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        isSelected={selectedIngredients.includes(ingredient.id)}
                        onToggle={() => onToggleIngredient(ingredient.id)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    ingredientsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
});