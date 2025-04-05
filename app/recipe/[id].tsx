import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Clock, Utensils, ChefHat, Heart, ArrowLeft, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRecipeStore } from '@/store/recipe-store';
import Button from '@/components/Button';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getRecipeById, favoriteRecipes, toggleFavorite, selectedIngredients } = useRecipeStore();
  
  const recipe = getRecipeById(id);
  const isFavorite = favoriteRecipes.includes(id);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Recipe not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavorite(id);
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

  const isIngredientSelected = (ingredientId: string) => {
    return selectedIngredients.includes(ingredientId);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: recipe.name,
          headerRight: () => (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Heart
                size={24}
                color={isFavorite ? Colors.secondary : Colors.text}
                fill={isFavorite ? Colors.secondary : 'transparent'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.cuisine}>{recipe.cuisine} Cuisine</Text>
          <Text style={styles.description}>{recipe.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={18} color={Colors.textLight} />
              <Text style={styles.metaText}>{recipe.cookingTime} min</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Utensils size={18} color={Colors.textLight} />
              <Text style={styles.metaText}>{recipe.servings} servings</Text>
            </View>
            
            <View style={styles.metaItem}>
              <ChefHat size={18} color={getDifficultyColor(recipe.difficulty)} />
              <Text style={[styles.metaText, { color: getDifficultyColor(recipe.difficulty) }]}>
                {recipe.difficulty}
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientTextContainer}>
                  <Text style={styles.ingredientName}>
                    {ingredient.name}
                    {ingredient.optional && <Text style={styles.optionalText}> (optional)</Text>}
                  </Text>
                  <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                </View>
                {isIngredientSelected(ingredient.ingredientId) && (
                  <View style={styles.ingredientCheck}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {recipe.tags.map((tag, index) => (
                <View key={index} style={styles.tagChip}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
    marginBottom: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  metaItem: {
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  ingredientTextContainer: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  ingredientAmount: {
    fontSize: 14,
    color: Colors.textLight,
  },
  optionalText: {
    fontStyle: 'italic',
    color: Colors.textLight,
  },
  ingredientCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 20,
  },
});