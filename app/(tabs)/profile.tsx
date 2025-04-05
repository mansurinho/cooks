import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Clock, Heart, Settings, ChefHat, Info, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRecipeStore } from '@/store/recipe-store';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { recentlyViewed, favoriteRecipes, clearIngredients } = useRecipeStore();

  const handleClearIngredients = () => {
    clearIngredients();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your cooking journey</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={40} color={Colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Cooking Enthusiast</Text>
            <Text style={styles.profileBio}>Ready to discover new recipes</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{recentlyViewed.length}</Text>
            <Text style={styles.statLabel}>Recently Viewed</Text>
          </View>
          
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Heart size={20} color={Colors.secondary} />
            <Text style={styles.statValue}>{favoriteRecipes.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          
          <View style={styles.statItem}>
            <ChefHat size={20} color={Colors.primary} />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Cooked</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/ingredients')}
          >
            <ChefHat size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Manage Ingredients</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleClearIngredients}
          >
            <Info size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Clear Selected Ingredients</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Info size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>About Cooks</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <ExternalLink size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Cooks v1.0.0</Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: Colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});