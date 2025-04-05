import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, PlusCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRecipeStore } from '@/store/recipe-store';
import RecipeCard from '@/components/RecipeCard';
import EmptyState from '@/components/EmptyState';
import Button from '@/components/Button';

export default function DiscoverScreen() {
  const router = useRouter();
  const { selectedIngredients, getMatchingRecipes, getMatchScore, addToRecentlyViewed } = useRecipeStore();
  const [recipes, setRecipes] = useState(getMatchingRecipes());

  useEffect(() => {
    // Update recipes when selected ingredients change
    setRecipes(getMatchingRecipes());
  }, [selectedIngredients]);

  const handleRecipePress = (recipeId: string) => {
    addToRecentlyViewed(recipeId);
    router.push(`/recipe/${recipeId}`);
  };

  const handleAddIngredientsPress = () => {
    router.push('/ingredients');
  };

  const renderRecipeItem = ({ item }: { item: any }) => {
    const matchScore = getMatchScore(item);
    return (
      <RecipeCard
        recipe={item}
        matchScore={matchScore}
        onPress={() => handleRecipePress(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cooks</Text>
        <Text style={styles.subtitle}>
          {selectedIngredients.length > 0
            ? `Recipes with your ${selectedIngredients.length} ingredients`
            : 'Discover delicious recipes'}
        </Text>
      </View>

      <View style={styles.ingredientsBar}>
        <TouchableOpacity
          style={styles.ingredientsButton}
          onPress={handleAddIngredientsPress}
        >
          <PlusCircle size={20} color={Colors.primary} />
          <Text style={styles.ingredientsButtonText}>
            {selectedIngredients.length > 0
              ? `${selectedIngredients.length} ingredients selected`
              : 'Add your ingredients'}
          </Text>
        </TouchableOpacity>
      </View>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title="No recipes found"
          message="Try selecting different ingredients or add more to find matching recipes."
          icon={<Search size={48} color={Colors.primary} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  ingredientsBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  ingredientsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  ingredientsButtonText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  recipesList: {
    padding: 20,
    paddingTop: 10,
  },
});