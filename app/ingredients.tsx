import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, X, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRecipeStore } from '@/store/recipe-store';
import ingredients from '@/mocks/ingredients';
import { IngredientCategory } from '@/types/recipe';
import CategorySection from '@/components/CategorySection';
import Button from '@/components/Button';

export default function IngredientsScreen() {
  const router = useRouter();
  const { selectedIngredients, addIngredient, removeIngredient } = useRecipeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<IngredientCategory | 'all'>('all');

  const handleToggleIngredient = (id: string) => {
    if (selectedIngredients.includes(id)) {
      removeIngredient(id);
    } else {
      addIngredient(id);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterPress = (category: IngredientCategory | 'all') => {
    setActiveFilter(category);
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || ingredient.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const groupedIngredients = filteredIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, typeof ingredients>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case IngredientCategory.PROTEIN:
        return 'Proteins';
      case IngredientCategory.VEGETABLE:
        return 'Vegetables';
      case IngredientCategory.FRUIT:
        return 'Fruits';
      case IngredientCategory.GRAIN:
        return 'Grains';
      case IngredientCategory.DAIRY:
        return 'Dairy';
      case IngredientCategory.HERB:
        return 'Herbs';
      case IngredientCategory.SPICE:
        return 'Spices';
      case IngredientCategory.OIL:
        return 'Oils';
      case IngredientCategory.OTHER:
        return 'Other';
      default:
        return category;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Ingredients</Text>
        <Text style={styles.subtitle}>What do you have in your kitchen?</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ingredients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textLight}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <X size={20} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            activeFilter === 'all' && styles.activeFilterChip,
          ]}
          onPress={() => handleFilterPress('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'all' && styles.activeFilterChipText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        {Object.values(IngredientCategory).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterChip,
              activeFilter === category && styles.activeFilterChip,
            ]}
            onPress={() => handleFilterPress(category)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === category && styles.activeFilterChipText,
              ]}
            >
              {getCategoryTitle(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedIngredients).map(([category, categoryIngredients]) => (
          <CategorySection
            key={category}
            title={getCategoryTitle(category)}
            ingredients={categoryIngredients}
            selectedIngredients={selectedIngredients}
            onToggleIngredient={handleToggleIngredient}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Done (${selectedIngredients.length} selected)`}
          onPress={() => router.back()}
          variant="primary"
          size="large"
          style={styles.doneButton}
        />
      </View>
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
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: Colors.text,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: Colors.text,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  doneButton: {
    width: '100%',
  },
});