import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRecipeStore } from '@/store/recipe-store';
import RecipeCard from '@/components/RecipeCard';
import EmptyState from '@/components/EmptyState';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteRecipes, getRecipeById, addToRecentlyViewed } = useRecipeStore();
  
  const favoriteRecipesList = favoriteRecipes
    .map(id => getRecipeById(id))
    .filter(recipe => recipe !== undefined);

  const handleRecipePress = (recipeId: string) => {
    addToRecentlyViewed(recipeId);
    router.push(`/recipe/${recipeId}`);
  };

  const renderRecipeItem = ({ item }: { item: any }) => {
    return (
      <RecipeCard
        recipe={item}
        onPress={() => handleRecipePress(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved recipes</Text>
      </View>

      {favoriteRecipesList.length > 0 ? (
        <FlatList
          data={favoriteRecipesList}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title="No favorites yet"
          message="Save your favorite recipes by tapping the heart icon on any recipe."
          icon={<Heart size={48} color={Colors.secondary} />}
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
  recipesList: {
    padding: 20,
    paddingTop: 10,
  },
});