import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Ingredient } from '@/types/recipe';

interface IngredientItemProps {
    ingredient: Ingredient;
    isSelected: boolean;
    onToggle: () => void;
}

export default function IngredientItem({ ingredient, isSelected, onToggle }: IngredientItemProps) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected && styles.selected,
            ]}
            onPress={onToggle}
            activeOpacity={0.7}
        >
            <Text style={[styles.name, isSelected && styles.selectedText]}>
                {ingredient.name}
            </Text>
            {isSelected && (
                <View style={styles.checkContainer}>
                    <Check size={16} color="#FFFFFF" />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.card,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    name: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    selectedText: {
        color: '#FFFFFF',
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});