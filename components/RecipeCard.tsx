import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Clock, Utensils, ChefHat, Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Recipe } from '@/types/recipe';
import { useRecipeStore } from '@/store/recipe-store';

interface RecipeCardProps {
    recipe: Recipe;
    matchScore?: number;
    onPress: () => void;
}

export default function RecipeCard({ recipe, matchScore, onPress }: RecipeCardProps) {
    const { favoriteRecipes, toggleFavorite } = useRecipeStore();
    const isFavorite = favoriteRecipes.includes(recipe.id);

    const handleFavoritePress = (e: any) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return Colors.success;
            case 'medium':
                return Colors.warning;
            case 'hard':
                return Colors.error;
            default:
                return Colors.textLight;
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image
                source={{ uri: recipe.image }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleFavoritePress}
                activeOpacity={0.8}
            >
                <Heart
                    size={20}
                    color={isFavorite ? Colors.secondary : '#FFFFFF'}
                    fill={isFavorite ? Colors.secondary : 'transparent'}
                />
            </TouchableOpacity>

            {matchScore !== undefined && matchScore > 0 && (
                <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>{Math.round(matchScore * 100)}% match</Text>
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{recipe.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{recipe.description}</Text>

                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Clock size={14} color={Colors.textLight} />
                        <Text style={styles.metaText}>{recipe.cookingTime} min</Text>
                    </View>

                    <View style={styles.metaItem}>
                        <Utensils size={14} color={Colors.textLight} />
                        <Text style={styles.metaText}>{recipe.servings} servings</Text>
                    </View>

                    <View style={styles.metaItem}>
                        <ChefHat size={14} color={getDifficultyColor(recipe.difficulty)} />
                        <Text style={[styles.metaText, { color: getDifficultyColor(recipe.difficulty) }]}>
                            {recipe.difficulty}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
            web: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
        }),
    },
    image: {
        width: '100%',
        height: 180,
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    matchText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 12,
        lineHeight: 20,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: Colors.textLight,
    },
});